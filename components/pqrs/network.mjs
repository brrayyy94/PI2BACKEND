import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { add, answer, get, getByUser, close, pqrsAnswers, notify, reopen } from "./controller.mjs";

const router = Router();

const controller = {  add, answer, get, getByUser, close, pqrsAnswers, notify, reopen };

// Create (C) /pqrs/add
router.post('/add', (req, res) => {
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Get (R) /pqrs/getByUser/:idUser
router.get('/getByUser/:idUser', (req, res) => {
    controller.getByUser(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Get (R) /pqrs/getByComplex/:idComplex
router.get('/getByComplex/:idComplex', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Get (R) /pqrs/getAnswers/:id
router.get('/getAnswers/:id', (req, res) => {
    controller.pqrsAnswers(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Update (U) /pqrs/answer/:id
router.put('/answer/:id', (req, res) => {
    controller.answer(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Update (U) /pqrs/notify/:userId
router.put('/notify/:userId', (req, res) => {
    controller.notify(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Update (U) /pqrs/close/:id
router.put('/close/:id', (req, res) => {
    controller.close(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

// Update (U) /pqrs/reopen/:id
router.put('/reopen/:id', (req, res) => {
    controller.reopen(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

export { router };