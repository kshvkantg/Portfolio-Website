const Item = require('../database/model/UserQueryModel');

const getAllItems = async (ctx) => {
    try {
        const { search } = ctx.request.query;
        const query = search ? { subject: { $regex: search, $options: "i" } } : {};
        const items = await Item.find(query);

        await ctx.render('query-card.pug', {
            cards: items, // Use filtered or all cards
            title: "Card Grid View",
        });
    } catch (error) {
        console.error(error.message);
        ctx.status = 500;
        ctx.body = {
            code: `${ctx.status}`,
            message: 'Internal Server Error',
            error: error.message
        };
    }
};

// Create a new item
const createItem = async (ctx) => {
    try {
        const { full_name, contact, subject, message } = ctx.request.body;

        if (!full_name || !contact || !subject || !message) {
            console.log(`Fields missing: ${ctx.request.body} ${full_name}, ${contact}, ${subject}, ${message}`);
            ctx.status = 400;
            ctx.body = {
                code: `${ctx.status}`,
                message: 'Fields required'
            };
            return;
        }

        const newItem = await Item.create({
            full_name: full_name,
            contact: contact,
            subject: subject,
            message: message
        });

        ctx.status = 201;
        ctx.body = {
            code: `${ctx.status}`,
            message: 'Query created successfully',
            item: newItem,
        };
    } catch (error) {
        console.error(error.message);
        ctx.status = 500;
        ctx.body = {
            code: `${ctx.status}`,
            message: 'Internal Server Error',
            error: error.message
        };
    }
};

module.exports = {
    getAllItems,
    createItem,
};