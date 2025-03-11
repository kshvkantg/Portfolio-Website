const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    google_user_id: String,
    first_name: String,
    last_name: String,
    user_email: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
