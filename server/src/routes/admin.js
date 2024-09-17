import adminController from '../controllers/admin.controller';
import middlewareAdminController from '../controllers/middlewareAdminController';
import middlewareCheckValidIP from '../controllers/middlewareCheckValidIP';

import express from 'express';
const router = express.Router();

const userRoute = (app) => {
    router.post('/login', adminController.Login); // middlewareCheckValidIP,
    router.post('/add/whiteip', middlewareAdminController, adminController.AddItemInWhiteIP);
    return app.use('/api/portal', router);
};

export default userRoute;
