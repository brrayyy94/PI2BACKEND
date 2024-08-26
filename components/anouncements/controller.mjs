import { addAnoun, getAnounsByComplex, updateAnoun, deleteAnoun, getAnounById } from './store.mjs';
import mongoose from 'mongoose';

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
        throw { status: err.status || 500, message: `Error creating announcement: ${err.message}` };
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
        throw { status: 500, message: `Error fetching announcements: ${err.message}` };
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
        throw { status: err.status || 500, message: `Error fetching announcement: ${err.message}` };
    }
};

// Update (U)
const update = async (req, res) => {
    try {
        const anuncio = req.body;
        validateAnuncio(anuncio);
        const updatedAnuncio = await updateAnoun(anuncio);
        if (!updatedAnuncio) {
            return { status: 404, message: 'Announcement not found' };
        }
        return { status: 201, message: 'Anuncio actualizado', data: updatedAnuncio };
    } catch (err) {
        throw { status: err.status || 500, message: `Error updating announcement: ${err.message}` };
    }
};

// Delete (D)
const remove = async (req, res) => {
    const { idAnoun } = req.params;
    try {
        if (!idAnoun) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(idAnoun)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const deletedAnuncio = await deleteAnoun(idAnoun);
        if (!deletedAnuncio) {
            return { status: 404, message: 'Announcement not found' };
        }
        return { status: 201, message: 'Anuncio eliminado', data: deletedAnuncio };
    } catch (err) {
        throw { status: err.status || 500, message: `Error deleting announcement: ${err.message}` };
    }
};

export { add, getByComplex, update, remove, getById };
