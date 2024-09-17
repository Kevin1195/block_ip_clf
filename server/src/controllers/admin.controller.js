import createError from 'http-errors';
import Admin from '../models/admin.model';

const Login = async (req, res, next) => {
    try {
        const data = req.body;
        let result = await Admin.Login(data);
        return res.status(200).json({
            result,
        });
    } catch (error) {
        next(error);
    }
};

const AddItemInWhiteIP = async (req, res, next) => {
    try {
        const data = req.body;
        let result = await Admin.AddItemInWhiteIP(data);
        return res.status(200).json({
            status: 200,
            result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    Login,
    AddItemInWhiteIP,
};
