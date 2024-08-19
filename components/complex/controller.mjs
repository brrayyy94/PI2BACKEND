import { addComplex, getComplex, updateComplex, deleteComplex } from "./store.mjs";
import Complex from "./model.mjs";

// Create (C)
const add = async (req, res) => {
    try {
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
        const complex_res = await Complex.findById(complex);
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
        const complex_res = await Complex.findById(complex).select('config');
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