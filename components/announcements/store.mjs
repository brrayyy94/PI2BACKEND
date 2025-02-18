import { sendPushNotificationByComplex, sendPushNotificationByUser } from '../../services/pushNotifications.mjs';
import { reactionsToSpanish } from '../../constants.mjs';
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

/**
 * Agrega o actualiza la reacción de un usuario en un anuncio.
 * Si el usuario ya tiene una reacción, la actualiza al nuevo tipo de reacción.
 * @param {string} anounId - El ID del anuncio.
 * @param {string} userId - El ID del usuario.
 * @param {'recommend' | 'celebrate' | 'support' | 'love' | 'interest' | 'removed'} reactionType - El tipo de reacción.
 * @returns {Promise<Object>} - Retorna el anuncio actualizado.
 * @throws {Object} - Retorna un objeto de error con el estado y el mensaje.
 */
export const addReaction = async (anounId, userId, reactionType) => {
    try {
        const announcement = await Anoun.findById(anounId);

        if (!announcement) {
            throw { status: 404, message: 'Announcement not found' };
        }

        if (!announcement.reactions) {
            announcement.reactions = [];
        }

        const existingReaction = announcement.reactions.find(reaction => reaction.user.equals(userId));

        if (reactionType !== 'removed') {
            if (existingReaction) {
                existingReaction.type = reactionType;

                var updatedAnoun = await announcement.save();
            } else {
                const user = await User.findById(userId);

                announcement.reactions.push({ user: userId, userName: user.userName, type: reactionType });

                updatedAnoun = await announcement.save();

                const userAnoun = await User.findById(announcement.User);

                if (userAnoun.role === 'RESIDENT') {
                    const reactUser = await User.findById(userId);

                    sendPushNotificationByUser(
                        announcement.User,
                        'Alguien ha reaccionado a tu anuncio',
                        reactUser.userName + ' ' + reactionsToSpanish[reactionType] + ' tu anuncio ' + announcement.Title
                    );
                }
            }
        } else {
            announcement.reactions = announcement.reactions.filter(reaction => !reaction.user.equals(userId));
        }

        return updatedAnoun;
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};