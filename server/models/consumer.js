const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let ConsumerSchema = new mongoose.Schema({
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

// UserSchema.virtual("myProducts",{
//     ref : `Product`,
//     localField: `_id`,
//     foreignField : `creator`
// });

ConsumerSchema.pre('save', async function (next, error) {
    const consumer = this;

    if (consumer.isModified('password')) {
        consumer.password = bcrypt.hashSync(consumer.password, 8);
    }
    next();
});

ConsumerSchema.methods.toJSON = function () {
    const consumer = this;
    const consumerObject = consumer.toObject();

    delete consumerObject.password;
    delete consumerObject.tokens;
    return consumerObject;
}

// Generate Auth token using JWT and store it in db then return token.....
ConsumerSchema.methods.generateAuthToken = async function () {
    const consumer = this;
    const token = jwt.sign({ _id: consumer._id.toString() }, "greaser-consumer");

    consumer.tokens = consumer.tokens.concat({ token });
    await consumer.save();

    return token;
}

ConsumerSchema.statics.findByCredentials = async (emailId, password) => {
    const consumer = await Consumer.findOne({ emailId });

    if (!consumer)
        throw new Error("User Not Found or does not exist");
    const match = await bcrypt.compare(password, consumer.password);

    if (!match)
        throw new Error("Password does not match");

    return consumer;
}

let Consumer = mongoose.model("Consumer", ConsumerSchema);

module.exports = Consumer 