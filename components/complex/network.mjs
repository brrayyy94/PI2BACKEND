import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { add, get, getConfigColors, update, remove, updateColors, addZone, getZone, updateZone, deleteZone, getZones } from "./controller.mjs";

const router = Router();

const controller = { add, get, getConfigColors, update, remove, updateColors, addZone, getZone, updateZone, deleteZone, getZones };

router.post('/add', (req, res) => {
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.get('/getColors/:idComplex', (req, res) => {
    controller.getConfigColors(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.get('/get/:idComplex', (req, res) => {
    controller.get(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.put('/update', (req, res) => {
    controller.update(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.put('/updateColors/:idComplex', (req, res) => {
    controller.updateColors(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

router.delete('/delete/:id', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Zones
router.post('/:idComplex/addZone', (req, res) => {
    addZone(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

router.get('/:idComplex/zone/:idZone', (req, res) => {
    getZone(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

router.put('/:idComplex/zone/:idZone', (req, res) => {
    updateZone(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

router.delete('/:idComplex/zone/:idZone', (req, res) => {
    deleteZone(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

router.get('/:idComplex/getAllZones', (req, res) => {
    getZones(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

export { router };