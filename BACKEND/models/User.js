const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
        type: Number,
        required: true,
        match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"],
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
