import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: '' ,
        pass: ''
    }
});

export async function sendMail(email: string, emailType: 'VERIFY' | 'RESET', userId: string) {
    try {
        const hashedToken = await bcrypt.hash(userId, 10)
        const updateFields: Partial<Record<string, any>> = {}
        if (emailType === 'RESET') {
            updateFields.resetPasswordToken = hashedToken
            updateFields.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        } else if (emailType === 'VERIFY') {
            updateFields.verificationToken = hashedToken
            updateFields.verificationTokenExpiry = Date.now() + 3600000 // 1 hour
        }

        await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true, runValidators: true }
        )

        const subject = emailType === 'RESET'
            ? 'Reset Your Password'
            : 'Verify Your Email'

        const url = `${process.env.DOMAIN}/${emailType === 'RESET' ? 'reset-password' : 'verify-email'
            }?token=${hashedToken}`

        const mailOptions = {
            from: 'no-reply@auth.com',
            to: email,
            subject,
            html: `
                <p>Click the link below to ${emailType === 'RESET' ? 'reset your password' : 'verify your email'}:</p>
                <a href="${url}">${url}</a>
            `,
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send email')
    }
}
