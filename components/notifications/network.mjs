import { Router } from "express";
import { success, error } from "../../network/response.mjs";
import { subscribe, testOne, unsubscribe } from "./controller.mjs";

const router = Router();

const controller = { subscribe, testOne, unsubscribe };

router.post("/subscribe", async (req, res) => {
    controller.subscribe(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

router.post("/test/:userId", async (req, res) => {
    testOne(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

router.post("/unsubscribe/:userId", async (req, res) => {
    controller.unsubscribe(req, res)
        .then(({ status, message }) => {
            success(res, message, status);
        })
        .catch(({ status, message }) => {
            error(res, 'Internal error', status || 500, message);
        });
});

export { router };