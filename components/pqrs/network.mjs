import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { add, answer, get, close, pqrsAnswers, notify } from "./controller.mjs";

const router = Router();

const controller = { add, get, close, pqrsAnswers, notify };

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

// Route PUT /pqrs/answerPqrs
router.put('/answerPqrs/:id', (req, res) => {
    answer(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Route PUT /pqrs/notifyPqrs/userId
router.put('/notifyPqrs/:userId', (req, res) => {
    notify(req, res)
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

// Route PUT /pqrs/closePqrs/:id
router.put('/closePqrs/:id', (req, res) => {
    controller.close(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Route GET /pqrs/getPqrsAnswers
router.get('/getPqrsAnswers/:id', (req, res) => {
    controller.pqrsAnswers(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

export { router };