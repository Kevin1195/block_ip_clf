import e from 'express';
import md5 from 'md5';
import connection from '../config/config';
import axios from 'axios';
require('dotenv').config();
export const checkToken = () => {
    const accessToken = sessionStorage.getItem('auth');
    if (!accessToken) {
        localStorage.removeItem('auth');
        window.location.href = '/login';
    }
};

const Login = async ({ username, password }) => {
    try {
        const [users] = await connection.execute(
            'SELECT * FROM users WHERE username = ? AND password = ? AND level = 1',
            [username, md5(password)],
        );
        if (users.length <= 0) return { status: false, message: 'Tài khoản không chính xác!' };
        if (users.length > 0) {
            let token = md5(username + password + Date.now());
            await connection.execute('UPDATE users SET token = ? WHERE username = ?', [token, users[0].username]);
            return { status: true, auth: token, message: 'Đăng nhập thành công!' };
        }
    } catch (error) {
        console.log(error);
    }
};

const findOneToken = async (token) => {
    try {
        const [user] = await connection.execute('SELECT * FROM users WHERE token = ?', [token]);
        return user;
    } catch (error) {
        console.log(error);
    }
};

const findValidIP = async (ip) => {
    try {
        const [validIP] = await connection.execute('SELECT * FROM valid_ip WHERE ip = ?', [ip]);
        return validIP;
    } catch (error) {
        console.log(error);
    }
};

const AddItemInWhiteIP = async ({ ip }) => {
    try {
        const dataCLF = await axios
            .post(
                'https://api.cloudflare.com/client/v4/accounts/d48a7afb7f7f8f861a2c59427657a607/rules/lists/c0813dd49bd7440987dcd9f90b75cbf1/items',
                [
                    {
                        ip,
                    },
                ],
                {
                    headers: {
                        'X-Auth-Email': process.env.X_AUTH_EMAIL,
                        'X-Auth-Key': process.env.X_AUTH_KEY,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(function (response) {
                if (response.status === 200)
                    return { status: true, data: response.data, message: 'Mở Khóa IP Thành Công!' };
            })
            .catch(function (error) {
                // console.log('error', error);
                return { status: false, message: 'Địa chỉ IP không hợp lệ!' };
            });
        return dataCLF;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    Login,
    findOneToken,
    AddItemInWhiteIP,
    findValidIP,
};
