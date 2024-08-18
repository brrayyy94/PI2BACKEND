import { router as user } from "../components/user/network.mjs"; 
import { router as anoun } from "../components/anouncements/network.mjs";

const routes = (server) => {
    server.use('/user', user);
    server.use('/anouncements', anoun);
}

export default routes;