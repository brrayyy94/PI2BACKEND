import express from 'express';
import bodyParser from 'body-parser';
import routes from './network/routes.mjs';
import cors from 'cors';
import { startConnection } from './db.mjs';
import dotenv from 'dotenv';
import swaggerUIPath from "swagger-ui-express";
import swaggerjsonFilePath from './docs/swagger.json' assert { type: 'json' };
import webpush from "web-push";

dotenv.config();

webpush.setVapidDetails(
  "mailto:no-reply@wetogether.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

const router = routes;

var app = express();

// Configure CORS
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
  }));

app.use(bodyParser.json());

//endpoint para la documentación de la API
app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

router(app);

// Ruta principal, responde con un mensaje simple
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Configura los encabezados CORS para permitir todas las solicitudes desde cualquier origen
    res.send('Este es el principal'); // Envía una respuesta con el mensaje 'Este es el principal'
});

// Función para iniciar el servidor
const startServer = async () => {
    await startConnection(); // Inicia la conexión a la base de datos
    app.listen(process.env.PORT, () => { // Inicia el servidor y escucha en el puerto especificado en la variable de entorno PORT
      console.log(`La aplicación está escuchando en http://localhost:${process.env.PORT}`); // Imprime un mensaje en la consola indicando que el servidor ha comenzado a escuchar
    });
  };
  
  startServer(); // Llama a la función startServer para iniciar el servidor