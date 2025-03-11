const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const databaseUtils = require("./Utils/dataBaseUtils")

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

module.exports = {passport};