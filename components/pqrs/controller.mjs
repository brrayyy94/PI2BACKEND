import { createPqrs, addAnswer, getPqrsByUser, getPqrsByComplex, closePqrs, reopenPqrs, 
    getPqrsAnswers, notifyPqrs, notifyOnePqrs } from "./store.mjs";
import User from "../user/model.mjs";
import mongoose from "mongoose";
import Pqrs from "./model.mjs";

// Utility function to check if a string is not empty or whitespace
const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

// Create (C)
const add = async (req, res) => {
    try {
        const { user, case: caseType, description, category } = req.body;

        // Validate required fields
        if (!user || !caseType || !description || !category) {
            return { status: 400, message: "Los espacios están vacios" };
        }
        if (!isNotEmptyOrWhitespace(user) || !isNotEmptyOrWhitespace(caseType) || !isNotEmptyOrWhitespace(description) || !isNotEmptyOrWhitespace(category)) {
            return { status:400, message: "Fields cannot be empty or contain only whitespace" };
        }

        // Fetch user data to get complex ID
        const userData = await User.findById(user);
        if (!userData) {
            return { status: 404, message: "User not found" };
        }

        // Prepare PQRS data
        const pqrsData = {
            user,
            userName: userData.userName,
            complex: userData.idComplex,
            case: caseType,
            description,
            category,
            date: new Date(),
            state: "pendiente",
            answer: []
        };

        const pqrs = await createPqrs(pqrsData);
        return res.status(201).json({ message: "PQRS created successfully", data: pqrs });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Read (R)
const get = async (req, res) => {
    try {
        const { idComplex } = req.params;

        // Validate the complex ID
        if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid complex ID' });
        }

        // Fetch PQRS entries by complex ID
        const pqrsEntries = await Pqrs.find({ complex: idComplex });

        if (pqrsEntries.length === 0) {
            return res.status(404).json({ message: 'No PQRS entries found for this complex' });
        }

        return res.status(200).json(pqrsEntries);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Read (R)
const getByUser = async (req, res) => {
    try {
        const { idUser } = req.params;

        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Fetch PQRS entries by user ID
        const pqrsEntries = await getPqrsByUser(idUser);

        if (pqrsEntries.length === 0) {
            return res.status(404).json({ message: 'No PQRS entries found for this user' });
        }

        return res.status(200).json(pqrsEntries);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// getPqrsAnswers (R)
const pqrsAnswers = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the PQRS ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid PQRS ID' });
        }

        const answers = await getPqrsAnswers(id);

        return res.status(200).json(answers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Add Answer (U)
const answer = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, answer } = req.body;

        // Validate the PQRS ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid PQRS ID" });
        }

        // Validate the answer
        if (!answer || !isNotEmptyOrWhitespace(answer)) {
            return res.status(400).json({ message: "Answer cannot be empty or contain only whitespace" });
        }

        // Fetch user data to get role
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch PQRS entry
        const pqrs = await Pqrs.findById(id);
        if (!pqrs) {
            return res.status(404).json({ message: "PQRS entry not found" });
        }

        // Ensure the first answer is from an admin
        if (pqrs.answer.length === 0 && userData.role !== 'ADMIN') {
            return res.status(400).json({ message: "The first answer must be from an admin" });
        }

        // Prevent residents from sending consecutive answers
        if (pqrs.answer.length > 0) {
            const lastAnswer = pqrs.answer[pqrs.answer.length - 1];
            if (lastAnswer.resident && userData.role === 'RESIDENT') {
                return res.status(400).json({ message: "Residents cannot send consecutive answers" });
            }
        }

        // Prepare answer data based on user role
        const answerData = {
            comment: answer,
            type:'Normal',
            date: new Date()
        };

        if (userData.role === 'ADMIN') {
            answerData.admin = userId;
            // Change PQRS state to "tramite" after admin's first answer
            if (pqrs.answer.length === 0  || pqrs.answer[pqrs.answer.length -1].type != "system") {
                pqrs.state = 'tramite';
            }
        } else if (userData.role === 'RESIDENT') {
            answerData.resident = userId;
        } else {
            return res.status(400).json({ message: "Invalid user role" });
        }

        pqrs.answer.push(answerData);
        await pqrs.save();

        return res.status(200).json({ message: "Answer added successfully", data: pqrs });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const notify = async (req, res) => {
    const { idUser } = req.params;
    try {
        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            return res.status(400).json({ message: 'Invalid User Id' });
        }

        await notifyPqrs(idUser);

        return { status: 200, message: 'The notification has been sent' };
    } catch (error) {
        return { status: 500, message: ` Error when reporting the PQRS ${error.message}`};
    }
};

const notifyOne = async (req, res) => {
    const { idUser, idPqrs } = req.params;
    try {
        // Validate the user ID
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            return res.status(400).json({ message: 'Invalid User Id' });
        }
        // Validate the PQRS ID
        if (!mongoose.Types.ObjectId.isValid(idPqrs)) {
            return res.status(400).json({ message: 'Invalid User Id' });
        }

        await notifyOnePqrs(idUser, idPqrs);

        return { status: 200, message: 'The notification has been sent' };
    } catch (error) {
        return { status: 500, message: ` Error when reporting the PQRS ${error.message}`};
    }
};

// Close (U)
const close = async (req, res) => {
    const { id } = req.params;
    try {
        // Validate the PQRS ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid PQRS ID' });
        }

        const pqrs = await closePqrs(id);

        return { status: 200, message: pqrs };
    } catch (error) {
        return { status: 500, message: 'Error al cerrar la PQRS', error: error.message };
    }
};

// Reopen (U)
const reopen = async (req, res) => {
    const { id } = req.params;
    try {
        // Validate the PQRS ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid PQRS ID' });
        }

        const pqrs = await reopenPqrs(id);

        return { status: 200, message: pqrs };
    } catch (error) {
        return { status: 500, message: 'Error al reabrir la PQRS', error: error.message };
    }
};

export { add, answer, get, getByUser, close, pqrsAnswers, notify, reopen, notifyOne };