var nodemailer = require('nodemailer');
import dotenv from 'dotenv';
import User from '../../models/Users';
dotenv.config();
const sendEmail = async(email, link) => {
    const from = process.env.EMAIL;
    const subject = "Bienvenido/a a Henry";
    var transporter =  await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: 
            `<div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
                <table border="0" cellspacing="0" cellpadding="0" align="center" id="m_5856674466128473302email_table" style="border-collapse:collapse">
                    <tbody>
                        <tr>
                            <td id="m_5856674466128473302email_content" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
                            <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                <tbody>
                                    <tr>
                                        <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="1" colspan="3" style="line-height:1px">
                                            <span style="color:#ffffff;font-size:1px">&nbsp; Hola, ${email}: Has sido aceptado para sumarte a la comunidad de HENRY. Ingresa a este Link: <a href="http://localhost:19006">AQUÍ</a> para ser redirigido a la App de Alumnos de Henry.</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                        <td>
                                            <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                <tbody>
                                                    <tr>
                                                        <td height="15" style="line-height:15px" colspan="3">&nbsp;</td></tr><tr><td width="32" align="left" valign="middle" style="height:32;line-height:0px">
                                                            <img src="https://henry-social-resources.s3-sa-east-1.amazonaws.com/LOGO-REDES-01_og.jpg" width="32" height="32" style="border:0" class="CToWUd">
                                                        </td>
                                                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                                        <td width="100%">
                                                            <span style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:19px;line-height:32px;color:#3b5998">HENRY</span>
                                                        </td>
                                                    </tr>
                                                    <tr style="border-bottom:solid 1px #e5e5e5">
                                                        <td height="15" style="line-height:15px" colspan="3">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                        <td>
                                            <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                <tbody>
                                                    <tr>
                                                        <td height="28" style="line-height:28px">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span class="m_5856674466128473302mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                                                <p>Hola, ${email}:</p>
                                                                <p></p>
                                                                <div>Has sido aceptado para sumarte a la comunidad de HENRY. Ingresa a este Link: <a href="${link}/">AQUÍ</a> para ser redirigido a la App de Alumnos de Henry.</span>
                                                                    <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:9px;margin-bottom:15px">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;
                                                                                    border-top:1px solid #ccc;border-bottom:1px solid #ccc">
                                                                                    <span class="m_5856674466128473302mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823"></span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <br>
                                                                </div>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="28" style="line-height:28px">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                            <td>
                                                <table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
                                                    <tbody>
                                                        <tr style="border-top:solid 1px #e5e5e5">
                                                            <td height="19" style="line-height:19px">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Se ha enviado este mensaje a <a href="mailto:${email}" style="color:#3b5998;text-decoration:none" target="_blank">${email}</a> a petición tuya.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`
    };
    
    await transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            throw new Error(`El email no ha podido enviarse a ${email}`)
        else
            console.log(info);
        });         
        return {
            from: from,
            to: email,
            subject: subject,
            text: `Mensaje enviado a ${email}` 
        }
    }
module.exports= {
    sendEmail
}