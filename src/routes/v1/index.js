import {Router} from "express";
import userRoute from "./user.route";


const router = Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

export default router;