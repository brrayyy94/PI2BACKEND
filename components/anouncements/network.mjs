import { Router } from "express";
import { add, get, update, remove } from "./controller.mjs";
import { success, error } from "../../network/response.mjs";

const router = Router();

const controller = { add, get, update, remove };

// Ruta para el método POST en /anouncements/addAnoun (C)
router.post('/addAnoun', (req, res) => {
    const { User } = req.body;

    // Validate required fields
    if (!User) {
        return error(res, 'Missing required fields', 400, {
            User: 'User is required'
        });
    }

    controller.add(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/getAnouns (R)
router.get('/getAnouns', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método POST en /anouncements/updateAnoun (U)
router.put('/updateAnoun', (req, res) => {
    controller.update(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método DELETE en /anouncements/deleteAnoun (D)
router.delete('/deleteAnoun', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

export { router };