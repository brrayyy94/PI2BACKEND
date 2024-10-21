import { sendPushNotificationByComplex } from '../../services/pushNotifications.mjs';
import Anoun from './model.mjs';
import User from '../user/model.mjs';

// Create (C)
export const addAnoun = async (anoun) => {
    const newAnoun = new Anoun(anoun);

    const owner = await User.findById(newAnoun.User);

    if (owner.role === 'RESIDENT') {
        sendPushNotificationByComplex(
            owner.idComplex,
            'ALL',
            newAnoun.Title,
            'Un residente ha publicado un nuevo anuncio'
        );
    } else {
        sendPushNotificationByComplex(
            owner.idComplex,
            'RESIDENT',
            newAnoun.Title,
            'La administración ha publicado un nuevo anuncio'
        );
    }

    return await newAnoun.save();
};

// Read (R)
export const getAnounsByComplex = async (idComplex) => {
    const foundAnoun = await Anoun.find({ Complex: idComplex }).sort({ Date: 1 });
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

export const getAnounsByUser = async (userId) => {
    const foundAnouns = await Anoun.find({ User: userId }).sort({ Date: 1 });
    if (!foundAnouns || foundAnouns.length === 0) {
        return { status: 404, message: "No se han encontrado anuncios para este usuario" };
    }
    return foundAnouns;
};

export const searchAnnouncementsByKeyword = async (keyword, idComplex) => {
    try {
        const announcements = await Anoun.find({
            Complex: idComplex,
            $or: [
                { Title: { $regex: keyword, $options: 'i' } },
                { Body: { $regex: keyword, $options: 'i' } }
            ]
        });
        return announcements;
    }
    catch (error) {
        throw new Error(error);
    }
};

// Search (R) by category
export const searchAnnouncementsByCategory = async (category) => {
    try {
        const announcements = await Anoun.find({ category });
        return announcements;
    } catch (error) {
        throw new Error(error);
    }
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