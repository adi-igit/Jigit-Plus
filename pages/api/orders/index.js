import clientPromise from '@/utils/mongodb';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db('shop-db');

  //only post method is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res.status(404).send({ error: 'Do not have form data...!' });

    const session = await getSession({ req });

    const { user } = session;
    if (!session) {
      return res.status(401).send('signin required');
    }

    const newOrder = await db.collection('orders').insertOne({
      ...req.body,
      createdAt: new Date().toDateString(),
      user: user.email,
    });

    res.status(201).send(newOrder);
  } else {
    res
      .status(500)
      .send({ message: 'HTTP method not valid only post Accepted' });
  }
};

export default handler;
