import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const currentYear = new Date().getFullYear();

export const sendEmail = async (email: string, subject: string, title: string, contents: string) => {
    const username = email.split('@')[0];
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(90deg, #0033cc, #66b3ff);
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header img {
                max-width: 50px;
                height: 50px;
            }
            .header h1 {
                margin: 10px 0 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                color: #333;
            }
            .content h2 {
                color: #0033cc;
                font-size: 20px;
            }
            .content p {
                margin: 10px 0;
                line-height: 1.5;
            }
            .footer {
                background: #e6f0ff;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #333;
            }
            .footer a {
                margin: 0 10px;
                text-decoration: none;
                color: #0033cc;
            }
            .footer a:hover {
                text-decoration: underline;
            }
            .icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                margin-right: 5px;
                vertical-align: middle;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${process.env.LOGO_URL}" alt="Company Logo">
                <h1>Kickside Rwanda</h1>
            </div>
            <div class="content">
                <h2>${title}</h2>
                <p>Dear ${username},</p>
                <p>${contents}</p>
            </div>
            <div class="footer">
                <p>&copy; ${currentYear} Kickside Rwanda</p>
                <p>
                    <a href="https://facebook.com/kickside_rw">
                        <img class="icon" src="https://example.com/facebook-icon.png" alt="Facebook Icon"> Facebook
                    </a> |
                    <a href="https://twitter.com/kickside_rw">
                        <img class="icon" src="https://example.com/twitter-icon.png" alt="Twitter Icon"> Twitter
                    </a> |
                    <a href="https://instagram.com/kickside_rw">
                        <img class="icon" src="https://example.com/instagram-icon.png" alt="Instagram Icon"> Instagram
                    </a>
                </p>
                <p>This is an automated message. Please do not reply.</p>
                <p>If you have any questions, please contact us at ${process.env.SUPPORT_EMAIL}</p>
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
        from: `"Kickside Rwanda" <${process.env.SMTP_USER}>`,
        to: email,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully:', info.response);
    } catch (error) {
        console.error('Error Sending Email:', error.message);
        throw new Error('Failed to send email. Please try again later.');
    }
};
