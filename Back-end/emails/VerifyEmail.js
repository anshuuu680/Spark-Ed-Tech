import { transporter } from "./nodemailer.js";


export const verifyEmail = async (to, resetToken) => {
  const info = await transporter.sendMail({
    from: '"Spark👻" <spark@gmail.com>',
    to, 
    subject: "Verify Email",
    text: `For the verification of your email Otp is: ${resetToken}`,
    html: `<p>For the verification of your email Otp is:</p><p><b>${resetToken}</b></p>`,
  });

};