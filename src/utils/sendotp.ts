import nodemailer from 'nodemailer'
import randomstring from 'randomstring'

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'mydummyemail145@gmail.com',
        pass: 'cgsxciyxccidjojl',
    },
})
export async function sendOTPtoMail(email: string) {
    const otp = randomstring.generate({
        length: 6,
        charset: 'numeric',
    })

    const mailOptions = {
        from: `Anant Mishra mydummyemail145@gmail.com`, // Sender address
        to: email, // Recipient address
        subject: 'Your OTP for Verification', // Subject line
        text: `Your OTP is: ${otp}`, // Plain text body
        html: `<p>Your OTP is: <b>${otp}</b></p><br><p>otp is only valid for 5 minutes</p>`, // HTML body (optional)
    }
    await transporter.sendMail(mailOptions)
    return Number(otp)
}
