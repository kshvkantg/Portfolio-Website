const fs = require('fs');
const path = require('path');

const getResume = async (ctx) => {
    const pdfDirectory = path.join(__dirname, '../public');
    const filename  = "resume.pdf";

    const filePath = path.join(pdfDirectory, filename);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
        ctx.status = 404;
        ctx.body = { error: 'PDF not found' };
        return;
    }

    ctx.set('Content-Disposition', `attachment; filename="${filename}"`);
    ctx.set('Content-Type', 'application/pdf');

    ctx.body = fs.createReadStream(filePath);
}
module.exports = {getResume}