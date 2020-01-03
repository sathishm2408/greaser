const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Not a valid Email')
        }
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.virtual("myProducts",{
    ref : `Product`,
    localField: `_id`,
    foreignField : `creator`
});

UserSchema.pre('save', async function (next, error) {
    const user = this;

    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 8);
    }
    next();
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// Generate Auth token using JWT and store it in db then return token.....
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "product-inventory");

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

UserSchema.statics.findByCredentials = async (emailId, password) => {
    const user = await User.findOne({ emailId });

    if (!user)
        throw new Error("User Not Found or does not exist");
    const match = await bcrypt.compare(password, user.password);

    if (!match)
        throw new Error("Password does not match");

    return user;
}

let User = mongoose.model("User", UserSchema);

module.exports = User 