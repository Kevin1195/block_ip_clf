import adminRoute from '../routes/admin';

const initWebRouter = (app) => {
    adminRoute(app);
};

export default initWebRouter;
