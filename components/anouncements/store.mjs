import Anoun from './model.mjs';

// Create (C)
export const addAnoun = async (anoun) => {
    const newAnoun = new Anoun(anoun);
    return await newAnoun.save();
}; 

// Read (R)
export const getAnounsByComplex = async (idComplex) => {
    const foundAnoun = await Anoun.find({ Complex: idComplex }).sort({ Date: 1});
    if (!foundAnoun) {
        return { status: 404, message: "No se han encontrado anuncios" };
    }
    return foundAnoun;
};

export const getAnounById = async (_id) => {
    const foundAnoun = await Anoun.findById(_id);
    if (!foundAnoun) {
        return { status: 404, message: "Anuncio no encontrado" };
    }
    return foundAnoun;
};

// Update (U)
export const updateAnoun = async (anoun) => {
    return await Anoun.findByIdAndUpdate(anoun._id, anoun, { new: true });
}

// Delete (D)
export const deleteAnoun = async (anounId) => {
    try {
        const deletedAnuncio = await Anoun.findByIdAndDelete(anounId);
        return deletedAnuncio;
    }
    catch (error) {
        throw new Error(error);
    }
};