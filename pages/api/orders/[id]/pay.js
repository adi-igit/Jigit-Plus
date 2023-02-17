import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Error: signin required');
  }

  const client = await clientPromise;
  const db = client.db('shop-db');

  const id = new ObjectId(req.query.id);

  const order = await db.collection('orders').findOne({ _id: id }).toArray();
  if (order[0]) {
    if (order[0].isPaid) {
      return res.status(400).send({ message: 'Error: order is already paid' });
    }

    order[0].isPaid = true;
    order[0].paidAt = Date.now();
    order[0].paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };

    res.send({ message: 'Order paid successfully', order: paidOrder });
  } else {
    res.status(404).send({ message: 'Error: order not found' })
  }
};

export default handler;
