import Complex from "./model.mjs";

// Create (C)
export const addComplex = async (complex) => {
    try {
        const newComplex = new Complex(complex);
        return newComplex.save();
    } catch (error) {
        throw new Error(error);
    }
};

// Read (R) complex
export const getComplex = async (complex) => {
    try {
        const complex_res = await Complex.findById(complex);
        return complex_res;
    } catch (error) {
        throw new Error(error);
    }
};

// Read (R) complex colors
export const getComplexColors = async (complex) => {
    try {
        const complex_res = await Complex.findById(complex).select('config.primaryColor config.secondaryColor');
        return complex_res;
    } catch (error) {
        throw new Error(error);
    }
};

// Update (U)
export const updateComplex = async (complex) => {
    try {
        await Complex.findByIdAndUpdate(complex._id, complex);
        return 'Conjunto actualizado';
    }
    catch (error) {
        throw new Error(error);
    }
};

// Delete (D)
export const deleteComplex = async (complex) => {
    try {
        await Complex.findByIdAndDelete(complex._id);
        return 'Conjunto eliminado';
    }
    catch (error) {
        throw new Error(error);
    }
};