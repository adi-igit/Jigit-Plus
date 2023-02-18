import clientPromise from '@/utils/mongodb';
import { getSession } from 'next-auth/react';
import bcryptjs from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { user } = session;

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 3)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  const client = await clientPromise;
  const db = client.db('shop-db');

  await db.collection('users').findOneAndUpdate(
    { email: `${user.email}` },
    {
      $set: {
        username: name,
        email: email,
        password: bcryptjs.hashSync(password),
      },
    }
  );

  res.send({ message: 'User updated' });
};

export default handler;
