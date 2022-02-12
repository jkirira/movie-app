const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d7328e61c5c745",
        pass: "cc2b377e911ead"
    }
});

async function sendNotification(email){
    if( !email ){
        console.log('function sendNotification needs a valid email address')
        return
    }

    let info = ''
    try {
       info = await transport.sendMail({
               from: '"TvShow App" <tvshowapp@example.com>',
               to: email,
               subject: 'New Episode',
               html:`
                    <div style="background: #10b981; color: #fff; padding: 30px"><h2>New Episode</h2></div>
                    <div>
                        <div style="display: flex; align-items: center; justify-content: center"><h3>New Episode Alert</h3></div>
                        <div style="display: flex; align-items: center; justify-content: center"><p>from TvShows project.</p></div>
                    </div>
                `
            });

       // console.log("Message sent: %s", info.messageId);
        console.log("Message sent!")

    } catch (e) {
        console.log("Message error", e);
    }

}

async function adminSendNotification(email, text_body){
    if( !email ){
        console.log('function sendNotification needs a valid email address')
        return
    }

    let info = ''
    try {
        info = await transport.sendMail({
            from: '"TvShow App" <tvshowapp@example.com>',
            to: email,
            subject: 'New Episode',
            text: text_body
        });

        // console.log("Message sent: %s", info.messageId);
        console.log("Message sent!")

    } catch (e) {
        console.log("Message error", e);
    }

}

module.exports = { sendNotification, adminSendNotification }