import { Router } from "express";
import { add, get, update, remove } from "./controller.mjs";
import { success, error } from "../../network/response.mjs";

const router = Router();
const controller = { add, get, update, remove };

// Ruta para el método POST en /anouncements/addAnoun (C)
router.post('/addAnoun', (req, res) => {
    // controller.addAnoun(req.body)
    //     .then(data => {
    //         success(req, res, data, 201);
    //     })
    //     .catch(err => {
    //         error(req, res, err, 500);
    //     });
    success(req, res, 'Anuncio creado', 201);
});

// Ruta para el método GET en /anouncements/getAnouns (R)
router.get('/getAnouns', (req, res) => {
    // controller.getAnouns()
    //     .then(data => {
    //         success(req, res, data, 200);
    //     })
    //     .catch(err => {
    //         error(req, res, err, 500);
    //     });
    success(req, res, 'Anuncios obtenidos', 200);
});

// Ruta para el método POST en /anouncements/updateAnoun (U)
router.post('/updateAnoun', (req, res) => {
    // controller.updateAnoun(req.body)
    //     .then(data => {
    //         success(req, res, data, 200);
    //     })
    //     .catch(err => {
    //         error(req, res, err, 500);
    //     });
    success(req, res, 'Anuncio actualizado', 200);
});

// Ruta para el método DELETE en /anouncements/deleteAnoun (D)
router.delete('/deleteAnoun', (req, res) => {
    // controller.deleteAnoun(req.body)
    //     .then(data => {
    //         success(req, res, data, 200);
    //     })
    //     .catch(err => {
    //         error(req, res, err, 500);
    //     });
    success(req, res, 'Anuncio eliminado', 200);
});

export { router };