import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { add, get, update, remove, getById} from "./controller.mjs";

const router = Router();

const controller = { add, get, update, remove, getById };

// Route POST /user/addUser
router.post('/addUser', (req, res) => {
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route GET /user/getUsersByComplex
router.get('/getUsersByComplex', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route GET /user/getUserById
router.get('/getUserById', (req, res) => {
    controller.getById(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route PUT /user/updateUser
router.put('/updateUser', (req, res) => {
    controller.update(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route DELETE /user/deleteUser
router.delete('/deleteUser', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

export { router };