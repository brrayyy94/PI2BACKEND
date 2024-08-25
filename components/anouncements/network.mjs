import { Router } from "express";
import { add, get, update, remove } from "./controller.mjs";
import { success, error } from "../../network/response.mjs";

const router = Router();

const controller = { add, get, update, remove };

// Ruta para el método POST en /anouncements/addAnoun (C)
router.post('/addAnoun', (req, res) => {
    controller.add(req, res)
        .then(({ status, message, data }) => {
            success(req, res, message, status, data);
        })
        .catch(({ status, message }) => {
            error(req, res, 'Error interno', status || 500, message);
        });
});

// Ruta para el método GET en /anouncements/getAnouns (R)
router.get('/getAnouns', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(req, res, message, status);
        })
        .catch(({ status, message }) => {
            error(req, res, 'Error interno', status || 500, message);
        });
});

// Ruta para el método POST en /anouncements/updateAnoun (U)
router.post('/updateAnoun', (req, res) => {
    controller.update(req, res)
        .then(({ status, message, data }) => {
            success(req, res, message, status, data);
        })
        .catch(({ status, message }) => {
            error(req, res, 'Error interno', status || 500, message);
        });
});

// Ruta para el método DELETE en /anouncements/deleteAnoun (D)
router.delete('/deleteAnoun', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message, data }) => {
            success(req, res, message, status, data);
        })
        .catch(({ status, message }) => {
            error(req, res, 'Error interno', status || 500, message);
        });
});

export { router };