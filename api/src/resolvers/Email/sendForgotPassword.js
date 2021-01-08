var nodemailer = require('nodemailer');
import dotenv from 'dotenv';
import User from '../../models/Users';
dotenv.config();

const forgotPasswordMail = async(email) => {
    const x = Math.floor((Math.random() * (999999 - 0 + 1)) + 0);
    const user = await User.findOne({"email": email})
    if (!user) {
        throw new Error(`El mail ${email} no corresponde con un alumno/staff de Henry.`);
    }
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
        from: "henryapp-project@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Recuperar Contraseña", // Subject line
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
                                            <span style="color:#ffffff;font-size:1px">&nbsp; Hola, ${user.firstName} ${user.lastName}: Hemos recibido una solicitud para modificar la contraseña de la Henry App. Introduce el siguiente código para restablecer la contraseña: ${x} </span>
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
                                                            <p>Hola, ${user.firstName} ${user.lastName}:</p>
                                                            <p></p>
                                                            <div>Hemos recibido una solicitud para modificar la contraseña de Henry App.</div>Introduce el siguiente código para restablecer la contraseña:
                                                                <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:9px;margin-bottom:15px">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;
                                                                                border-top:1px solid #ccc;border-bottom:1px solid #ccc">
                                                                                <span class="m_5856674466128473302mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">${x}</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <br>
                                                                <div>
                                                                    <span style="color:#333333;font-weight:bold">¿No has pedido este cambio?</span>
                                                                </div>Si no has solicitado una nueva contraseña, <a href="https://www.facebook.com/login/recover/cancel/?n=185095&amp;id=100004264538193&amp;i=www" style="color:#3b5998;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/login/recover/cancel/?n%3D185095%26id%3D100004264538193%26i%3Dwww&amp;source=gmail&amp;ust=1608086689003000&amp;usg=AFQjCNHKQwCCkVz7omaxLtPfsnsyg6JSZA">infórmanos</a>.</span></td></tr><tr><td height="28" style="line-height:28px">&nbsp;</td></tr></tbody></table></td><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td></tr><tr><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td><td><table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse"><tbody><tr style="border-top:solid 1px #e5e5e5"><td height="19" style="line-height:19px">&nbsp;</td></tr><tr><td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">Se ha enviado este mensaje a <a href="mailto:facugs2090@gmail.com" style="color:#3b5998;text-decoration:none" target="_blank">facugs2090@gmail.com</a> a petición tuya.
                                                            </td>
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
            throw new Error(`No se ha podido enviar el mail al mail ${email}`)
        else
            console.log(info);
        });
        await User.findOneAndUpdate({email: email}, {forgotPassword: x})     
        return await User.findOne({"email": email})
    }
module.exports= {
    forgotPasswordMail
}