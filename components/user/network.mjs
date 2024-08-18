import { Router } from "express";
import { success, error } from "../../network/response";
import { add, get, update, remove } from "./controller";

const router = Router();

const controller = {add, get, update, remove};

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

// Route GET /user/getUsers
router.get('/getUsers', (req, res) => {
    controller.get(req, res)
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