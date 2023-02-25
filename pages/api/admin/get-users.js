import clientPromise from '@/utils/mongodb';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session && session.user.email === 'jigitreply@gmail.com') {
    return res.status(500).send({ error: 'Not authenticated as an admin...!' });
  }

  if (req.method === 'GET') {
    const client = await clientPromise;
    const db = client.db('shop-db');
    const users = await db.collection('users').find({}).sort({ _id: -1 }).limit(5).toArray();
    return res.status(200).send(users);
  } else {
    res.status(500).send({ error: 'Bad request...' });
  }
};

export default handler;
