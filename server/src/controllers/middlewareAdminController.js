import Admin from '../models/admin.model';

const middlewareAdminController = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        if (token) {
            let data = await Admin.findOneToken(token);
            if (data.length <= 0 || data[0].level !== 1) {
                return res.json({
                    status: 'error',
                    message: 'Tài khoản không được phép!',
                });
            } else {
                next();
            }
        } else {
            return res.json({
                status: 'error',
                message: 'Token không hợp lệ!',
            });
        }
    } catch (error) {
        console.log('Middleware Admin Controler Error', error);
        next(error);
    }
};

export default middlewareAdminController;
