import { router as user } from "../components/user/network.js"; 
import { router as anoun } from "../components/anouncements/network.js";

const routes = (server) => {
    server.use('/user', user);
    server.use('/anouncements', anoun);
}

export default routes;