// api/orders/:id

import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  if (req.method === 'GET') {
    const client = await clientPromise;
    const db = client.db('shop-db');

    const id = new ObjectId(req.query.id);

    const order = await db.collection('orders').find({ _id: id }).toArray();

    res.status(200).send(order);
  } else {
    res.status(500).send({ error: 'Failed to fetch order id...!' });
  }
};

export default handler;
