const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) return next(saltError);

        bcrypt.hash(user.password, salt, function (hashError, hash) {
            if (hashError) return next(hashError);
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.validateEmail = function () {
    return new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.email);
};

UserSchema.methods.validatePasswordStrength = function () {
    return new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/).test(this.password);
};

module.exports = model('User', UserSchema);