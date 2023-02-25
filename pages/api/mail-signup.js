// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const BASE_URL = 'https://jigit-shop.vercel.app';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = process.env.EMAIL;
    const pass = process.env.EMAIL_PASS;

    const { email: emailUser, name } = req.body;

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
      },
    });

    let response = {
      body: {
        name: username,
        intro: "Welcome to JIGIT+! We're very excited to have you on board.",
        action: {
          instructions: 'To see out latest products, please click button:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Click here',
            link: `${BASE_URL}/products`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
        signature: 'Sincerely',
      },
    };

    let mail = MailgenGenerator.generate(response);

    let message = {
      from: 'JIGIT+ <jigitreply@gmail.com>',
      to: emailUser,
      subject: 'Thank you for registering',
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).send({ msg: 'you should receive an email' });
      })
      .catch((error) => {
        return res.status(500).send({ error: `Erorr ${error}` });
      });
  }
};

export default handler;
