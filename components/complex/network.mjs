import {Router} from "express";
import {success, error} from "../../network/response.mjs";
import {add, get, getConfigColors, update, remove} from "./controller.mjs";

const router = Router();

const controller = {add, get, getConfigColors, update, remove};

// Route POST /complex/addComplex
router.post('/addComplex', (req, res) => {
    controller.add(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Route GET /complex/getComplexColors
router.get('/getComplexColors/:complex', (req, res) => {
    controller.getConfigColors(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Route GET /complex/getComplex
router.get('/getComplex/:complex', (req, res) => {
    controller.get(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Route PUT /complex/updateComplex
router.put('/updateComplex', (req, res) => {
    controller.update(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Route DELETE /complex/deleteComplex
router.delete('/deleteComplex', (req, res) => {
    controller.remove(req, res)
    .then(({status, message}) => {
        success(res, message, status);
    })
    .catch(({status, message}) => {
        error(res, 'Error interno', status || 500, message);
    });
});

export {router};
