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
        return new Error(error);
    }
};

// Update (U) complex colors
export const updateComplexColors = async (idComplex, primaryColor, secondaryColor) => {
    try {
        const complex = await Complex.findByIdAndUpdate(
            idComplex,
            { 
                $set: { 
                    'config.primaryColor': primaryColor, 
                    'config.secondaryColor': secondaryColor 
                } 
            },
            { new: true } // Esto asegura que el documento actualizado sea retornado
        );

        return complex;
    }
    catch (error) {
        return new Error(error);
    }
};

// Delete (D)
export const deleteComplex = async (id) => {
    try {
        const deletedComplex = await Complex.findByIdAndDelete(id);
        return deletedComplex;
    }
    catch (error) {
        throw new Error(error);
    }
};