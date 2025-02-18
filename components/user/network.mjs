import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import {
    add,
    get,
    update,
    remove,
    getById,
    login,
    addPet,
    updatePet,
    removePet,
    addVehicle,
    updateVehicle,
    removeVehicle
} from "./controller.mjs";

const controller = {
    add,
    get,
    update,
    remove,
    getById,
    login,
    addPet,
    updatePet,
    removePet,
    addVehicle,
    updateVehicle,
    removeVehicle
};

const router = Router();

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
    controller.login(req)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            // Usa la función error para manejar errores
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

// Route POST /user/addPet/:userId
router.post('/addPet/:userId', (req, res) => {
    controller.addPet(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route PUT /user/updatePet/:userId
router.put('/updatePet/:userId' , (req, res) => {
    controller.updatePet(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route DELETE /user/removePet:userId/:petId
router.delete('/removePet/:userId/:petId', (req, res) => {
    controller.removePet(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route POST /user/addVehicle/:userId
router.post('/addVehicle/:userId', (req, res) => {
    controller.addVehicle(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route PUT /user/updateVehicle/:userId
router.put('/updateVehicle/:userId', (req, res) => {
    controller.updateVehicle(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Route DELETE /user/removeVehicle/:userId/:vehicleId
router.delete('/removeVehicle/:userId/:vehicleId', (req, res) => {
    controller.removeVehicle(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

export { router };