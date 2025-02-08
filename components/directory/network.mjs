import { Router } from "express";
import { createDirectory, getDirectoriesByComplex, getDirectoryByUser, removeDirectory, updateDirectory, getDirectoryById } from "./controller.mjs";
import { success, error } from "../../network/response.mjs";

const router = Router();

const controller = { createDirectory, getDirectoriesByComplex, getDirectoryByUser, removeDirectory, updateDirectory, getDirectoryById };

router.get('/getByUser/:userId', (req, res) => {
    controller.getDirectoryByUser(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.get('/getByComplex/:complexId', (req, res) => {
    controller.getDirectoriesByComplex(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.post('/create', (req, res) => {
    controller.createDirectory(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.put('/update/:id', (req, res) => {
    controller.updateDirectory(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.delete('/delete/:id', (req, res) => {
    controller.removeDirectory(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.get('/getById/:id', (req, res) => {
    controller.getDirectoryById(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

export { router };