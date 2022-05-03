const jwt = require('jwt-simple');
const moment = require('moment');

const secret = process.env.JWT_SECRET_KEY;
const expTime = process.env.JWT_EXP_TIME_SECONDS;

const createAccessToken = (user) => {
    const payload = {
        id: user._id,
        createdAt: moment().unix(),
        exp: moment().add(expTime, "seconds").unix()
    }

    return jwt.encode(payload, secret);
};

const createRefreshToken = (user) => {
    const payload = {
        id: user._id,
        exp: moment().add(expTime, "seconds").unix()
    }

    return jwt.encode(payload, secret);
}

const decodeToken = (token) => jwt.decode(token, secret);

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken
};