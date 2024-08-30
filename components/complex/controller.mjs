import { addComplex, getComplex, updateComplex, deleteComplex, getComplexColors } from "./store.mjs";
import mongoose from "mongoose";

const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

// Create (C)
const add = async (req, res) => {
    const {name, address, config } = req.body;
    try {
        const primaryColor = config.primaryColor;
        const secondaryColor = config.secondaryColor;

        if (!name || !address || !primaryColor || !secondaryColor) {
            return { status: 400, message: 'Missing required fields' };
        }
        if (!isNotEmptyOrWhitespace(name) || !isNotEmptyOrWhitespace(address) || !isNotEmptyOrWhitespace(primaryColor) || !isNotEmptyOrWhitespace(secondaryColor)) {
            return { status: 400, message: 'Fields cannot be empty or contain only whitespace' };
        }
        const complex = await addComplex(req.body);
        return { status: 201, message: complex };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex){
            return { status: 400, message: 'ID is required'}
        }
        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const complex_res = await getComplex(idComplex);
        if (!complex_res) {
            return { status: 404, message: 'Conjunto no encontrado' };
        }
        return { status: 200, message: complex_res };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Read (R) complexColors
const getConfigColors = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const complex_res = await getComplexColors(idComplex);
        if (!complex_res) {
            return { status: 404, message: 'Conjunto no encontrado' };
        }
        return { status: 200, message: complex_res };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Update (U)
const update = async (req, res) => {
    const {_id, name, address, config } = req.body;
    try {
        const primaryColor = config.primaryColor;
        const secondaryColor = config.secondaryColor;
        if (!_id || !name || !address || !primaryColor || !secondaryColor) {
            return { status: 400, message: 'Missing required fields' };
        }
        if (!isNotEmptyOrWhitespace(_id) || !isNotEmptyOrWhitespace(name) || !isNotEmptyOrWhitespace(address) || !isNotEmptyOrWhitespace(primaryColor) || !isNotEmptyOrWhitespace(secondaryColor)) {
            return { status: 400, message: 'Fields cannot be empty or contain only whitespace' };
        }
        await updateComplex(req.body);
        return { status: 200, message: 'Conjunto actualizado' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
}

// Delete (D)
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return { status: 400, message: 'ID is required' };
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const deletedComplex = await deleteComplex(id);
        if (!deletedComplex) {
            return { status: 404, message: 'Conjunto no encontrado' };
        }
        return { status: 200, message: 'Conjunto eliminado' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

export { add, get, getConfigColors, update, remove };