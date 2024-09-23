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
