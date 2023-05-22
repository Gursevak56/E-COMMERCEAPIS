const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const sendemail = (option)=>{
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:25,
        secure:false,
        auth:{
            user:"gursevaksinghgill21@gmail.com",
            pass:process.env.EMAIL_PASS
        }
    })
    const mailoptions={
        from:option.email,
        to:option.email,
        subject:option.subject,
        html:'<p>hii '+option.name+',\n\n please click on verify link to reset your password\n\n <a href="http://localhost:2000/api/reset-password/'+option.token+'">verify</a><p>'
    }
 transporter.sendMail(mailoptions);
}
module.exports = sendemail;