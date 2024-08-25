import Anoun from './model.mjs';

// Create (C)
export const addAnoun = async (anoun) => {
    const newAnoun = new Anoun(anoun);
    return await newAnoun.save();
}; 

// Read (R)
export const getAnouns = async () => {
    return await Anoun.find();
};

// Update (U)
export const updateAnoun = async (anoun) => {
    return await Anoun.findByIdAndUpdate(anoun._id, anoun, { new: true });
}

// Delete (D)
export const deleteAnoun = async (anounId) => {
    return await Anoun.findByIdAndDelete(anounId);
}