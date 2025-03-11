const User = require("../model/User");

async function checkAndInsertUsers(profile) {
    try {
        const existingUser = await User.findOne({google_user_id: profile.id});
        if (existingUser) {
            console.log(`User ${profile.displayName} Already Exists`);
            return existingUser;
        } else {
            return await createANewUser(profile);
        }
    } catch (error) {
        console.error("Error checking user:", error);
        throw error;
    }
}

async function createANewUser(profile) {
    try {
        const newUser = new User({
            google_user_id: profile.id, first_name: profile.displayName,
        });

        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
}

module.exports = {checkAndInsertUsers};
