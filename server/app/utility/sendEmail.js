const nodemailer = require('nodemailer');

exports.sendEmail = (mailOps) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    auth: {
      user: 'apikey',
      pass:
        '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',
    },
  });

  const mailOption = mailOps;

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
      return new Error('Email sending failed!');
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Email to : %s', info.response);
  });
};
