import { getSession } from 'next-auth/react';
import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session && session.user.email === 'jigitreply@gmail.com') {
    return res.status(500).send({ error: 'Not authenticated as an admin...!' });
  }

  if (req.method === 'DELETE') {
    const client = await clientPromise;
    const db = client.db('shop-db');

    const { id } = req.body;

    const ID = new ObjectId(id);

    await db.collection('products').findOneAndDelete({ _id: ID });
    res.send({ message: 'Successfully deleted product...' });
  } else {
    res.status(500).send({ Error: 'Failed to delete product...' });
  }
};

export default handler;
