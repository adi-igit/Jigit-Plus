import clientPromise from '@/utils/mongodb';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { user } = session;
  const client = await clientPromise;
  const db = client.db('shop-db');

  const orders = await db
    .collection('orders')
    .find({ user: user.email })
    .toArray();
  res.send(orders);
};

export default handler;
