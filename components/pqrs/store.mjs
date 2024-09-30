import Pqrs from "./model.mjs";

// Send notification
export const notifyPqrs = async (pendingPqrs) => {
    try {
        const now = new Date();
        const twoDaysAgo = new Date(now.setDate(now.getDate() - 2)); // Fecha de hace 2 días
        
        // Buscar PQRS que tengan más de 2 días y no tengan respuestas
        const pendingPqrs = await Pqrs.find({
            user: userId,
            date: { $lte: twoDaysAgo },
            state: 'pendiente',
            answer: { $size: 0 }  // Asegura que no haya respuestas
        });    
        
        return await Promise.all(pendingPqrs.map(async (pqrs) => {
            pqrs.answer.push('La PQRS no ha sido respondida después de 2 días');
            await pqrs.save(); // Guardar los cambios en la base de datos
            return pqrs;
        }));
    } catch (error) {
        return new Error(error);
    }
};

// Create (C)
export const createPqrs = async (pqrs) => {
    try {
        const newPqrs = new Pqrs(pqrs);
        await newPqrs.save();
        return 'PQRS created\n', newPqrs;
    } catch (error) {
        return new Error(error);
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
export const closePqrs = async (id) => {
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

// getPqrsAnswers (R)
export const getPqrsAnswers = async (id) => {
    try {
        const pqrs = await Pqrs.findById(id);
        return pqrs.answer;
    } catch (error) {
        throw new Error(error);
    }
};