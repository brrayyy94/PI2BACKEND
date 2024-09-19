import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { add, get } from "./controller.mjs";

const router = Router();

const controller = { add, get };

// Route POST /pqrs/addPqrs
router.post('/addPqrs', (req, res) => {
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Route GET /pqrs/getPqrsByComplex
router.get('/getPqrsByComplex/:idComplex', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

export { router };