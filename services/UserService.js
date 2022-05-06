const UserSchema = require('../models/User');

const { createAccessToken } = require('./utils/JwtService');

const createUser = async ({ email, password }) => {
    if (email === undefined || email.length === 0) throw new Error('Email parameter is missing');
    if (password === undefined) throw new Error('Password parameter is missing');

    const user = new UserSchema({ email, password});

    if (!user.validateEmail()) {
        throw new Error('Invalid email');
    }

    if (!user.validatePasswordStrength()) {
        throw new Error('Password does not meet complexity requirements: At least 8 characters long, one lowercase letter, ' +
            'one uppercase letter, one digit and one special character');
    }

    const userCreated = await user.save();
    console.log(`User: <${JSON.stringify(userCreated)}> has been successfully created`);
    return userCreated;
};

const getToken = async ({ email, password }) => {
    if (email === undefined || password === undefined) return undefined;

    const user = await UserSchema.findOne({ email });

    if (user === null) return undefined;

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return undefined;

    const token = createAccessToken(user);
    return token;
}

const getById = async (id) => {
    return await UserSchema.findById(id);
}

module.exports = {
    createUser,
    getToken,
    getById
};