import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { add, get, update, remove, getById, login} from "./controller.mjs";

const router = Router();

const controller = { add, get, update, remove, getById, login };

// Route POST /user/addUser
router.post('/add', (req, res) => {
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

//Route POST /login
router.post('/login', (req, res) => {
    controller.login(req, res)
    .then(({ status, message }) => {
        success(res, message, status);
    })
    .catch(({ status, message }) => {
        error(res, 'Error interno', status || 500, message);
    });
});

// Route GET /user/getUsersByComplex
router.get('/getByComplex/:idComplex', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route GET /user/getUserById
router.get('/getById/:idUser', (req, res) => {
    controller.getById(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route PUT /user/updateUser
router.put('/update', (req, res) => {
    controller.update(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route DELETE /user/deleteUser
router.delete('/delete/:id', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

export { router };