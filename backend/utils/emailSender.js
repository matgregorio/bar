import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

export const sendVerificationEmail = async (email, token) =>{
    const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: '"Black Bar" <noreply@blackbar.com.br>',
        to: email,
        subject: 'Verificação de Email',
        html: `Clique <a href="${verificationUrl}"> aqui</a> para verificar seu email.`
    });
};