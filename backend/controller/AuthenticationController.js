const passport = require("koa-passport");

const authenticateLocalUser = async (ctx, next) => {
    return passport.authenticate("local", async (err, user, info) => {
        if (err) {
            ctx.status = 500;
            ctx.body = {message: "Internal server error"};
            return;
        }

        if (!user) {
            ctx.status = 401;
            ctx.body = {message: info.message};
            return;
        }

        ctx.login(user); // Log the user in
        ctx.body = {message: "Login successful", user};
    })
}

const initiatePassportReqController = passport.authenticate("google", { scope: ["profile", "email"] })

const handelCallbackController =  passport.authenticate("google", { failureRedirect: "/" })

const handelRedirectController =  async (ctx) => {
    ctx.redirect("/api/query"); // Redirect to Query Page after user login
}

module.exports = {
    authenticateLocalUser,
    initiatePassportReqController,
    handelCallbackController,
    handelRedirectController
}

