import Pqrs from "./model.mjs";

// Create (C)
export const createPqrs = async (pqrs) => {
    try {
        const newPqrs = new Pqrs(pqrs);
        await newPqrs.save();
        return 'PQRS created\n', newPqrs;
    } catch (error) {
        throw new Error(error);
    }
};

// AddAnswer (U)
export const addAnswer = async (id, answer) => {
    try {
        const pqrs = await Pqrs.findById(id);
        pqrs.answer.push(answer);
        await pqrs.save();
        return 'Answer added\n', pqrs;
    } catch (error) {
        throw new Error(error);
    }
};

// Read (R)
export const getPqrsByComplex = async (idComplex) => {
    try {
        const pqrs = await Pqrs.find({ idComplex });
        return pqrs;
    } catch (error) {
        throw new Error(error);
    }
};

// Update (U)
export const cerrarPqrs = async (id) => {
    try {

        const pqrs = await Pqrs.findById(id);

        if (!pqrs) {
            return { status: 404, message: 'PQRS no encontrada' };
        }

        // Verificar si la solicitud ya está cerrada
        if (pqrs.state === 'cerrado') {
            return { status: 400, message: 'La PQRS ya está cerrada' };
        }

        const pqrsClosed = await Pqrs.findByIdAndUpdate(id, { state: 'cerrado' }, { new: true });
        return pqrsClosed;
    } catch (error) {
        return new Error(error);
    }
};
