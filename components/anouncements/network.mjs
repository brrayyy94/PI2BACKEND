import { Router } from "express";
import { add, getByComplex, update, remove, getById } from "./controller.mjs";
import { success, error } from "../../network/response.mjs";

const router = Router();

const controller = { add, getByComplex, update, remove, getById };
const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

// Ruta para el método POST en /anouncements/addAnoun (C)
router.post('/addAnoun', (req, res) => {
    const { User, Title, Body, category } = req.body;

    // Validate required fields
    if (!User || !Title || !Body || !category) {
        return error(res, 'Missing required fields', 400, { User, Title, Body, category 
        });
    }

    if (!isNotEmptyOrWhitespace(User) || !isNotEmptyOrWhitespace(Title) || !isNotEmptyOrWhitespace(Body) || !isNotEmptyOrWhitespace(category)) {
        return error(res, 'Fields cannot be empty or contain only whitespace', 400, { User, Title, Body, category 
        });
    }
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/getAnounsByComplex/:idComplex (R)
router.get('/getAnounsByComplex/:idComplex', (req, res) => {
    controller.getByComplex(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/getAnounById/:_id (R)
router.get('/getAnounById/:_id', (req, res) => {
    controller.getById(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});
// Ruta para el método POST en /anouncements/updateAnoun (U)
router.put('/updateAnoun', (req, res) => {
    const { _id, Title, Body, category } = req.body;

    // Validate required fields
    if (!_id || !Title || !Body || !category) {
        return error(res, 'Missing required fields', 400, { _id, Title, Body, category 
        });
    }
    if (!isNotEmptyOrWhitespace(_id) || !isNotEmptyOrWhitespace(Title) || !isNotEmptyOrWhitespace(Body) || !isNotEmptyOrWhitespace(category)) {
        return error(res, 'Fields cannot be empty or contain only whitespace', 400, { _id, Title, Body, category 
        });
    }
    controller.update(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método DELETE en /anouncements/deleteAnoun/idAnoun (D)
router.delete('/deleteAnoun/:idAnoun/:userId', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

export { router };