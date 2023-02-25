// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const handler = async (req, res) => {
  const {
    name,
    email: userEmail,
    subject: useSubject,
    message: userMessage,
  } = req.body;

  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  if (req.method === 'POST') {
    // send gmail message
    let config = {
      service: 'gmail',
      auth: {
        user: email,
        pass,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailgenGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: name,
        link: 'https://mailgen.js/',
        logo: 'https://mailgen.js/img/logo.png',
        logoHeight: '30px',
        copyright: 'Copyright © 2016 Mailgen. All rights reserved.',
      },
    });

    let response = {
      body: {
        greeting: `Message from ${name}`,
        intro: userMessage,
        signature: 'Sincerely',
      },
    };

    let mail = MailgenGenerator.generate(response);

    let message = {
      from: email,
      to: email,
      subject: useSubject,
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).send({ msg: 'you should receive an email' });
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  }
};

export default handler;
