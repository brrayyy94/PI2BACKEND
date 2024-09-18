import { createPqrs, getPqrsByComplex } from "./store.mjs";
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
            return res.status(400).json({ message: "Los espacios están vacios" });
        }
        if (!isNotEmptyOrWhitespace(user) || !isNotEmptyOrWhitespace(caseType) || !isNotEmptyOrWhitespace(description) || !isNotEmptyOrWhitespace(category)) {
            return res.status(400).json({ message: "Fields cannot be empty or contain only whitespace" });
        }

        // Fetch user data to get complex ID
        const userData = await User.findById(user);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prepare PQRS data
        const pqrsData = {
            user,
            complex: userData.idComplex, // Assuming the user's complex ID is stored in user.complex
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

export { add, get };
