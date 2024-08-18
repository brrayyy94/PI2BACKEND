import express from 'express';
import Anoun from './model.mjs';

// Create (C)
export const addAnoun = async (anoun) => {
    try {
        const newAnoun = new Anoun(anoun);
        await newAnoun.save();
        return 'Anuncio creado';
    } catch (error) {
        throw new Error(error);
    }
}; 

// Read (R)
export const getAnouns = async () => {
    try {
        const anouns = await Anoun.find();
        return anouns;
    } catch (error) {
        throw new Error(error);
    }
};

// Update (U)
export const updateAnoun = async (anoun) => {
    try {
        await Anoun.findByIdAndUpdate(anoun._id, anoun);
        return 'Anuncio actualizado';
    }
    catch (error) {
        throw new Error(error);
    }
}

// Delete (D)
export const deleteAnoun = async (anoun) => {
    try {
        await Anoun.findByIdAndDelete(anoun._id);
        return 'Anuncio eliminado';
    }
    catch (error) {
        throw new Error(error);
    }
}