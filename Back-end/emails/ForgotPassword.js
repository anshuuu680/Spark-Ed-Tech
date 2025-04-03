import { transporter } from "./nodemailer.js"; 



export const forgotPassword = async (to, resetToken) => {
  const info = await transporter.sendMail({
    from: '"Spark👻" <spark@gmail.com>',
    to, 
    subject: "Password Reset Request",
    text: `You requested a password reset. Use the following token to reset your password: ${resetToken}`,
    html: `<p>You requested a password reset. Use the following token to reset your password:</p><p><b>${resetToken}</b></p>`,
  });

};