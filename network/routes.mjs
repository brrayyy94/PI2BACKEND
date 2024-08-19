import { router as user } from "../components/user/network.mjs"; 
import { router as anoun } from "../components/anouncements/network.mjs";
import { router as complex } from "../components/complex/network.mjs";

const routes = (server) => {
    server.use('/user', user);
    server.use('/anouncements', anoun);
    server.use('/complex', complex);
}

export default routes;