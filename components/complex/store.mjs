import Complex from "./model.mjs";

export const addComplex = async (complex) => {
    try {
        const newComplex = new Complex(complex);
        return newComplex.save();
    } catch (error) {
        throw new Error(error);
    }
};

export const getComplex = async (complex) => {
    try {
        const complex_res = await Complex.findById(complex);
        return complex_res;
    } catch (error) {
        throw new Error(error);
    }
};

export const getComplexColors = async (complex) => {
    try {
        const complex_res = await Complex.findById(complex).select('config.primaryColor config.secondaryColor');
        return complex_res;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateComplex = async (complex) => {
    try {
        await Complex.findByIdAndUpdate(complex._id, complex);
        return 'Conjunto actualizado';
    }
    catch (error) {
        return new Error(error);
    }
};

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
            { new: true }
        );

        return complex;
    }
    catch (error) {
        return new Error(error);
    }
};

export const deleteComplex = async (id) => {
    try {
        const deletedComplex = await Complex.findByIdAndDelete(id);
        return deletedComplex;
    }
    catch (error) {
        throw new Error(error);
    }
};

// Zones 

export const addComplexZone = async (idComplex, zone) => {
    try {
        const complex = await Complex.findById(idComplex);
        if (!complex) {
            throw new Error('Complex not found');
        }
        complex.zones.push(zone);
        return complex.save();
    } catch (error) {
        throw new Error(error);
    }
};

export const getComplexZone = async (idComplex, idZone) => {
    try {
        const complex = await Complex.findById(idComplex);
        if (!complex) {
            throw new Error('Complex not found');
        }
        const zone = complex.zones.id(idZone);
        return zone;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateComplexZone = async (idComplex, idZone, zoneData) => {
    try {
        const complex = await Complex.findById(idComplex);
        if (!complex) {
            throw new Error('Complex not found');
        }
        const zone = complex.zones.id(idZone);
        if (!zone) {
            throw new Error('Zone not found');
        }
        Object.assign(zone, zoneData);
        return complex.save();
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteComplexZone = async (idZone) => {
    try {
        const complex = await Complex.findOne({ 'zones._id': idZone });
        if (!complex) {
            throw new Error('Complex not found');
        }
        complex.zones.pull({ _id: idZone });
        return complex.save();
    } catch (error) {
        throw new Error(error);
    }
};