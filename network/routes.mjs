import { router as user } from "../components/user/network.mjs"; 
import { router as anoun } from "../components/anouncements/network.mjs";
import { router as complex } from "../components/complex/network.mjs";
import { router as pqrs } from "../components/pqrs/network.mjs";

const routes = (server) => {
    server.use('/user', user);
    server.use('/anouncements', anoun);
    server.use('/complex', complex);
    server.use('/pqrs', pqrs);
}

export default routes;