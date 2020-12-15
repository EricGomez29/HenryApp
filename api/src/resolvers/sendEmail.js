var nodemailer = require('nodemailer');
import dotenv from 'dotenv';
dotenv.config();
const sendEmail = (input) => {
    console.log(input)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: input.from, // sender address
            to: input.to, // list of receivers
            subject: input.subject, // Subject line
            html: `<p>Bienvenido a HENRY. El link de redirrecionamiento es: <a href="http://localhost:19006">¡AQUI!</a></p>`// plain text body
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
        });
    
}
module.exports= {
    sendEmail
}