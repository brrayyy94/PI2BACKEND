import { createPqrs, getPqrsByComplex } from "./store.mjs";

// Create (C)
const add = async (req, res) => {
    try {
        const { idComplex, idUser, description } = req.body;

        // Validate required fields
        if (!idComplex || !idUser || !description) {
            return { status: 400, message: "Los espacios están vacios" };
        }
        if (!isNotEmptyOrWhitespace(idComplex) || !isNotEmptyOrWhitespace(idUser) || !isNotEmptyOrWhitespace(description)) {
            return { status: 400, message: "Fields cannot empty or contain only whitespace" };
        }
        const pqrs = await createPqrs(req.body);
        return { status: 201, message: pqrs };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const pqrs = await getPqrsByComplex(idComplex);
        if (!pqrs) {
            return { status: 404, message: 'PQRS not found' };
        }
        return { status: 200, message: pqrs };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export { add, get };
