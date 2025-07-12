const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['global-admin', 'regional-admin', 'partner-sender', 'partner-receiver'],
        required: true
    },
    region: {
        type: String,
        default: null
    }
})

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema)