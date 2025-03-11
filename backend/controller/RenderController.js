// controllers to render different pages
const renderIndexController = async (ctx) => {
    await ctx.render('home.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
};

const renderQueryController = async (ctx) => {
    await ctx.render('query-card.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
};

const renderWentWrongController = async (ctx) => {
    if (ctx.status === 500) {
        await ctx.render('something-went-wrong.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
    }
};

const render404Controller = async (ctx) => {
    if (ctx.status === 404) {
        await ctx.render('PageNotFound.pug', { title: 'My Portfolio', message: 'Welcome to my website' });
    }
};

module.exports = {renderIndexController, renderQueryController, renderWentWrongController, render404Controller};