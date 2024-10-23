import { addAnoun, getAnounsByComplex, updateAnoun, deleteAnoun, getAnounById, getAnounsByUser, searchAnnouncementsByKeyword, searchAnnouncementsByCategory, addReaction } from './store.mjs';
import mongoose from 'mongoose';
import User from '../user/model.mjs';

// Helper function to validate request body
const validateAnuncio = (anuncio) => {
    if (!anuncio || Object.values(anuncio).some(field => !field)) {
        return { status: 400, message: 'All fields are required' };
    }
};

// Create (C)
const add = async (req, res) => {
    try {
        const anuncio = req.body;
        validateAnuncio(anuncio);
        const newAnuncio = await addAnoun(anuncio);
        return { status: 201, message: newAnuncio };
    } catch (err) {
        return { status: err.status || 500, message: `Error creating announcement: ${err.message}` };
    }
};

// Read (R)
const getByComplex = async (req, res) => {
    const { idComplex } = req.params; 
    try {
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const anuncios = await getAnounsByComplex( idComplex );
        return { status: 200, message: anuncios };
    } catch (err) {
        return { status: 500, message: `Error fetching announcements: ${err.message}` };
    }
};

// Read (R) by Anuncio ID
const getById = async (req, res) => {
    const { _id } = req.params;
    try {
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const anuncio = await getAnounById(_id);
        if (!anuncio) {
            return { status: 404, message: 'Announcement not found' };
        }
        return { status: 200, message: anuncio };
    } catch (err) {
        return { status: err.status || 500, message: `Error fetching announcement: ${err.message}` };
    }
};

// Read (R) by User ID
const getByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const anuncios = await getAnounsByUser(userId);

        return { status: 200, message: anuncios };
    } catch (err) {
        return { message: `Error fetching announcements: ${err.message}` };
    }
};

// Search (R) by keyword
const searchAnnouncements = async (req, res) => {
    const { keyword, idComplex } = req.params;
    try {
        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        if (!idComplex) {
            return { status: 400, message: 'idComplex is required' };
        }
        if (!keyword) {
            return { status: 400, message: 'Keyword is required' };
        }
        const announcements = await searchAnnouncementsByKeyword(keyword, idComplex);

        return { status: 200, message: announcements };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

// Search (R) by category
export const filterAnnouncementsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
        }

        const announcements = await searchAnnouncementsByCategory(category);
        if (!announcements || announcements.length === 0) {
            return res.status(404).json({ message: 'No announcements found for this category' });
        }

        return res.status(200).json(announcements);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Update (U)
const update = async (req, res) => {
    const { idUser } = req.params;
    try {
        const anuncio = req.body;
        // Actualizacion manualmente el campo LastModify
        anuncio.LastModify = new Date().toISOString();

        // Fetch the user
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const foundAnoun = await getAnounById(anuncio._id);
        if (!foundAnoun) {
            return { status: 404, message: 'Announcement not found' };
        }
        // Check if the user is the creator or an admin
        if (foundAnoun.CreatedBy !== user.userName && user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to delete this announcement' });
        }
        validateAnuncio(anuncio);
        const updatedAnuncio = await updateAnoun(anuncio);
        if (!updatedAnuncio) {
            return { status: 404, message: 'Announcement not found' };
        }
        return { status: 201, message: 'Anuncio actualizado', data: updatedAnuncio };
    } catch (err) {
        return { status: err.status || 500, message: `Error updating announcement: ${err.message}` };
    }
};

// Delete (D)
const remove = async (req, res) => {
    const { idAnoun, userId } = req.params;

    try {
        if (!idAnoun || !userId) {
            return res.status(400).json({ message: 'Announcement ID and User ID are required' });
        }

        // Validate if the IDs are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(idAnoun) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Fetch the announcement
        const anuncio = await getAnounById(idAnoun);
        if (!anuncio) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

// Check if the user is neither the creator nor an admin
        if (anuncio.CreatedBy !== user.userName && user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to delete this announcement' });
        }

        // Proceed with deletion
        const deletedAnuncio = await deleteAnoun(idAnoun);
        if (!deletedAnuncio) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        return res.status(200).json({ message: 'Announcement deleted', data: deletedAnuncio });
    } catch (err) {
        return res.status(500).json({ message: `Error deleting announcement: ${err.message}` });
    }
};

/**
 * Controlador para agregar o actualizar una reacción en un anuncio.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const react = async (req, res) => {
    const { anounId, userId } = req.params;
    const { reactionType } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(anounId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const validReactions = ['recommend', 'celebrate', 'support', 'love', 'interest', 'removed'];
        if (!validReactions.includes(reactionType)) {
            return res.status(400).json({ message: 'Invalid reaction type' });
        }

        const updatedAnoun = await addReaction(anounId, userId, reactionType);

        return res.status(200).json(updatedAnoun);
    } catch (error) {
        return res.status(500).json({ message: `Error adding/updating reaction: ${error.message}` });
    }
};


export { add, getByComplex, update, remove, getById, getByUser, searchAnnouncements, react };
