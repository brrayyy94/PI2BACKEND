import { addComplex, getComplex, updateComplex, deleteComplex, getComplexColors, updateComplexColors, addComplexZone, getComplexZone, updateComplexZone, deleteComplexZone } from './store.mjs';
import mongoose from "mongoose";

const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

const add = async (req) => {
    const { name, address, config } = req.body;
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

const get = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' }
        }

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

const getConfigColors = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' };
        }

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

const update = async (req) => {
    const { _id, name, address, config } = req.body;
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

const updateColors = async (req) => {
    const { idComplex } = req.params;
    const { primaryColor, secondaryColor } = req.body;

    try {
        if (!primaryColor || !secondaryColor) {
            return { status: 400, message: 'Both primaryColor and secondaryColor are required' };
        }

        const complex = await updateComplexColors(idComplex, primaryColor, secondaryColor);

        if (!complex) {
            return { status: 404, message: 'Complex not found' };
        }

        return { status: 200, message: complex };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

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

// Zones

const addZone = async (req, res) => {
    const { idComplex } = req.params;
    const zone = req.body;
    zone.complex = idComplex;
    try {
        if (!idComplex || !zone.name || !zone.availableDays || !zone.availableHours) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validar que la hora de inicio no sea mayor que la hora de finalización
        const { availableHours } = zone;
        if (availableHours && new Date(availableHours.start) >= new Date(availableHours.end)) {
            return res.status(400).json({ message: 'Start time must be before end time' });
        }

        if (!mongoose.Types.ObjectId.isValid(zone.complex)) {
            return res.status(400).json({ message: 'Invalid complex ID format' });
        }

        const complex = await addComplexZone(idComplex, zone);
        return res.status(201).json({ message: complex.zones[complex.zones.length - 1] });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getZone = async (req, res) => {
    const { idComplex, idZone } = req.params;
    try {
        if (!idComplex || !idZone) {
            return { status: 400, message: 'ID is required' };
        }
        if (!mongoose.Types.ObjectId.isValid(idComplex) || !mongoose.Types.ObjectId.isValid(idZone)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const zone = await getComplexZone(idComplex, idZone);

        return { status: 200, message: zone };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

const updateZone = async (req, res) => {
    const { idComplex, idZone } = req.params;
    const zoneData = req.body;
    try {
        if (!idComplex || !idZone || !zoneData) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (!mongoose.Types.ObjectId.isValid(idComplex) || !mongoose.Types.ObjectId.isValid(idZone)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // Validar que la hora de inicio no sea mayor que la hora de finalización
        const { availableHours } = zoneData;
        if (availableHours && new Date(availableHours.start) >= new Date(availableHours.end)) {
            return res.status(400).json({ message: 'Start time must be before end time' });
        }

        const complex = await updateComplexZone(idComplex, idZone, zoneData);
        return res.status(200).json(complex.zones.id(idZone));
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteZone = async (req, res) => {
    const { idZone } = req.params;
    try {
        if (!idZone) {
            return { status: 400, message: 'ID is required' };
        }
        if (!mongoose.Types.ObjectId.isValid(idZone)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedZone = await deleteComplexZone(idZone);

        if (!deletedZone) {
            return { status: 404, message: 'Zone not found' };
        }

        return { status: 200, message: 'Zone deleted' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

const getZones = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' };
        }
        if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const complex = await getComplex(idComplex);
        return { status: 200, message: complex.zones };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

export { add, get, getConfigColors, update, remove, updateColors, addZone, getZone, updateZone, deleteZone, getZones };