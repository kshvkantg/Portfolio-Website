const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    google_user_id: { type: String, required: true, unique: true },
    first_name: String,
    last_name: String,
    user_email: { type: String, required: true, unique: true },
    local_password: String,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;


