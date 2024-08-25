import { addAnoun, getAnouns, updateAnoun, deleteAnoun } from './store.mjs';

// Helper function to validate request body
const validateAnuncio = (anuncio) => {
    if (!anuncio || Object.values(anuncio).some(field => !field)) {
        throw { status: 400, message: 'All fields are required' };
    }
};

// Create (C)
const add = async (req, res) => {
    try {
        const anuncio = req.body;
        validateAnuncio(anuncio);
        const newAnuncio = await addAnoun(anuncio);
        return { status: 201, message: 'Anuncio creado', data: newAnuncio };
    } catch (err) {
        throw { status: err.status || 500, message: `Error creating announcement: ${err.message}` };
    }
};

// Read (R)
const get = async (req, res) => {
    try {
        const anuncios = await getAnouns();
        return { status: 200, message: anuncios };
    } catch (err) {
        throw { status: 500, message: `Error fetching announcements: ${err.message}` };
    }
};

// Update (U)
const update = async (req, res) => {
    try {
        const anuncio = req.body;
        validateAnuncio(anuncio);
        const updatedAnuncio = await updateAnoun(anuncio);
        if (!updatedAnuncio) {
            throw { status: 404, message: 'Announcement not found' };
        }
        return { status: 201, message: 'Anuncio actualizado', data: updatedAnuncio };
    } catch (err) {
        throw { status: err.status || 500, message: `Error updating announcement: ${err.message}` };
    }
};

// Delete (D)
const remove = async (req, res) => {
    try {
        const { _id } = req.query;
        if (!_id) {
            throw { status: 400, message: 'ID is required' };
        }
        const deletedAnuncio = await deleteAnoun(_id);
        if (!deletedAnuncio) {
            throw { status: 404, message: 'Announcement not found' };
        }
        return { status: 201, message: 'Anuncio eliminado', data: deletedAnuncio };
    } catch (err) {
        throw { status: err.status || 500, message: `Error deleting announcement: ${err.message}` };
    }
};

export { add, get, update, remove };
