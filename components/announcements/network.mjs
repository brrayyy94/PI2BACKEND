import { Router } from "express";
import { add, getByComplex, getById, getByUser, searchAnnouncements, update, remove, filterAnnouncementsByCategory, react } from "./controller.mjs";
import { success, error } from "../../network/response.mjs";

const router = Router();

const controller = { add, getByComplex, searchAnnouncements, update, remove, getById, getByUser, filterAnnouncementsByCategory, react };
const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

// Ruta para el método POST en /anouncements/add (C)
router.post('/add', (req, res) => {
    const { User, Title, Body, category } = req.body;

    // Validate required fields
    if (!User || !Title || !Body || !category) {
        return error(res, 'Missing required fields', 400, { User, Title, Body, category 
        });
    }

    if (!isNotEmptyOrWhitespace(User) || !isNotEmptyOrWhitespace(Title) || !isNotEmptyOrWhitespace(Body) || !isNotEmptyOrWhitespace(category)) {
        return error(res, 'Fields cannot be empty or contain only whitespace', 400, { User, Title, Body, category 
        });
    }
    controller.add(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/getByComplex/:idComplex (R)
router.get('/getByComplex/:idComplex', (req, res) => {
    controller.getByComplex(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/getByUser/:userId (R)
router.get('/getByUser/:userId', (req, res) => {
    controller.getByUser(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/getById/:_id (R)
router.get('/getById/:_id', (req, res) => {
    controller.getById(req, res)
        .then(({ status, message }) => {
            success(res, message, status); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método GET en /anouncements/search/:keyword/:idComplex (R)
router.get('/search/:keyword/:idComplex', (req, res) => {
    controller.searchAnnouncements(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});

// Ruta para el método GET en /anouncements/filterByCategory/:category (R)
router.get('/filterByCategory/:category', (req, res) => {
    controller.filterAnnouncementsByCategory(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message);
        });
});


// Ruta para el método PUT en /anouncements/update/:idUser (U)
router.put('/update/:idUser', (req, res) => {
    const { _id, Title, Body, category } = req.body;

    // Validate required fields
    if (!_id || !Title || !Body || !category) {
        return error(res, 'Missing required fields', 400, { _id, Title, Body, category 
        });
    }
    if (!isNotEmptyOrWhitespace(_id) || !isNotEmptyOrWhitespace(Title) || !isNotEmptyOrWhitespace(Body) || !isNotEmptyOrWhitespace(category)) {
        return error(res, 'Fields cannot be empty or contain only whitespace', 400, { _id, Title, Body, category 
        });
    }
    controller.update(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método DELETE en /anouncements/delete/:idAnoun/:userId (D)
router.delete('/delete/:idAnoun/:userId', (req, res) => {
    controller.remove(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data); // Pass only res
        })
        .catch(({ status, message }) => {
            error(res, 'Error interno', status || 500, message); // Pass only res
        });
});

// Ruta para el método POST en /anouncements/react/:anounId/:userId (Reacción)
router.post('/react/:anounId/:userId', (req, res) => {
    react(req, res)
        .then(({ status, message, data }) => {
            success(res, message, status, data);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

export { router };