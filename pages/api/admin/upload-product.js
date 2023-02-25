import { getSession } from 'next-auth/react';
import clientPromise from '@/utils/mongodb';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

const handler = async (req, res) => {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const session = await getSession({ req });
  if (!session && session.user.email === 'jigitreply@gmail.com') {
    return res.status(500).send({ error: 'Not authenticated as an admin...!' });
  }

  if (req.method === 'POST') {
    if (!req.body || req.body.length === 0)
      return res.status(404).send({ error: 'Do not have form data...!' });

    const { slug } = req.body;

    //check duplicate products
    const checkExisting = await db.collection('products').findOne({ slug });

    if (checkExisting)
      return res.status(422).send({ message: 'Product already exists...!' });

    const result = await db.collection('products').insertOne({ ...req.body });
    return res.status(201).send(result);
  } else {
    res
      .status(500)
      .send({ message: 'HTTP method not valid only post Accepted' });
  }
};

export default handler;
