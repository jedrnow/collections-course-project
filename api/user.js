const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    admin: Boolean,
    blocked: Boolean,
});

module.exports = mongoose.model("User", user);