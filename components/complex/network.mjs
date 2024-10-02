import {Router} from "express";
import {success, error} from "../../network/response.mjs";
import {add, get, getConfigColors, update, remove, updateColors} from "./controller.mjs";

const router = Router();

const controller = {add, get, getConfigColors, update, remove, updateColors};

// Post (C) complex
router.post('/add', (req, res) => {
    controller.add(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Get (R) colors of complex
router.get('/getColors/:idComplex', (req, res) => {
    controller.getConfigColors(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Get (R) complex
router.get('/get/:idComplex', (req, res) => {
    controller.get(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Update (U) complex
router.put('/update', (req, res) => {
    controller.update(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Update (U) colors of complex
router.put('/updateColors/:idComplex', (req, res) => {
    controller.updateColors(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Delete (D) complex
router.delete('/delete/:id', (req, res) => {
    controller.remove(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

export {router};
