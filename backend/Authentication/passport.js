const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const databaseUtils = require("./Utils/dataBaseUtils")

const LocalStrategy = require("passport-local").Strategy;

dotenv.config();

passport.serializeUser( (user,done)=> {
    done(null,user.id)
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GoogleClientId,
            clientSecret: process.env.GoogleClientSecret,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(`Access Token: ${accessToken}`);
            try {
                const user = await databaseUtils.checkAndInsertUsers(profile);
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ user_email: email });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                const isAMatch = await bcrypt.compare(password, user.password);
                if (!isAMatch) {
                    return done(null, false, { message: "Incorrect password" });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = {passport};