import { addComplex, getComplex, updateComplex, deleteComplex, getComplexColors } from "./store.mjs";
import mongoose from "mongoose";

// Create (C)
const add = async (req, res) => {
    const {name, address, config } = req.body;
    try {
        if (!name || !address || !config) {
            return { status: 400, message: 'Faltan datos obligatorios' };
        }
        const complex = await addComplex(req.body);
        return { status: 201, message: complex };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req, res) => {
    const { complex } = req.params;
    try {
        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(complex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const complex_res = await getComplex(complex);
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
    const { complex } = req.params;
    try {
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(complex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const complex_res = await getComplexColors(complex);
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
    try {
        await updateComplex(req.body);
        return { status: 200, message: 'Conjunto actualizado' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
}

// Delete (D)
const remove = async (req, res) => {
    try {
        await deleteComplex(req.body);
        return { status: 200, message: 'Conjunto eliminado' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

export { add, get, getConfigColors, update, remove };