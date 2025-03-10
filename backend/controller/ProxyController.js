const validateIpRequest = async (ctx, next) => {
    const internalSecret = process.env.INTERNAL_SECRET;
    const clientSecret = ctx.headers['x-app-secret'];

    if (!clientSecret || clientSecret !== internalSecret) {
        ctx.status = 403;
        ctx.body = { error: 'Forbidden: Access Denied' };
        return;
    }

    await next();
};

module.exports = {
    validateIpRequest
};
