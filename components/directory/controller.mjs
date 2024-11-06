import { add, deleteDirectory, getByComplex, getByUser, update, getById } from './store.mjs';

const createDirectory = async (req, res) => {
    const { complexId, userId, service, phone } = req.body;

    if (!complexId || !userId || !service || !phone ) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const directory = await add(req.body);
        res.status(201).json(directory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateDirectory = async (req, res) => {
    const { id } = req.params;
    const { complexId, userId, service, phone } = req.body;

    if (!complexId || !userId || !service || !phone ) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const directory = await update(id, req.body);
        res.status(200).json(directory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeDirectory = async (req, res) => {
    const { id } = req.params;

    try {
        const directory = await deleteDirectory(id);
        res.status(200).json(directory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDirectoriesByComplex = async (req, res) => {
    const { complexId } = req.params;

    try {
        const directories = await getByComplex(complexId);
        res.status(200).json(directories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDirectoryByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const directories = await getByUser(userId);
        res.status(200).json(directories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDirectoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const directory = await getById(id);
        res.status(200).json(directory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createDirectory, updateDirectory, removeDirectory, getDirectoriesByComplex, getDirectoryByUser, getDirectoryById };