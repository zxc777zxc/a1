const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '---@gmail.com',
        pass: '---',
    },
});

const mailOptions = {
    from: '---',
    to: '---',
    subject: 'Test Email from Node.js',
    text: 'Hello! This is a test email sent from Node.js using Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
