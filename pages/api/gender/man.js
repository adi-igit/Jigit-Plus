import clientPromise from '@/utils/mongodb';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('shop-db');

      const gender = await db
        .collection('products')
        .find({ gender: 'man' })
        .limit(15)
        .toArray();

      res.json(gender);
    } catch (error) {
      return res.status(404).end({ error: 'Failed to fetch products!' });
    }
  }
};

export default handler;
