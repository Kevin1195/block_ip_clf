import Admin from '../models/admin.model';

const middlewareCheckValidIP = async (req, res, next) => {
    try {
        const ip = req.headers['x-forwarded-for'];
        if (ip) {
            let data = await Admin.findValidIP(ip);
            if (data.length <= 0) {
                return res.json({
                    status: 'error',
                    message: 'IP không được phép truy cập!',
                });
            } else {
                next();
            }
        } else {
            return res.json({
                status: 'error',
                message: 'Không hợp lệ!',
            });
        }
    } catch (error) {
        console.log('Middleware Admin Controler Error', error);
        next(error);
    }
};

export default middlewareCheckValidIP;
