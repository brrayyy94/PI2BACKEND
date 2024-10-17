import { Router } from "express";
import webpush from "web-push";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

webpush.setVapidDetails(
    "mailto:no-reply@wetogether.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
);

const controller = {  };

router.post("/subscribe", async (req, res) => {

    console.log(req.body);
    res.status(201).json();
});


export { router };