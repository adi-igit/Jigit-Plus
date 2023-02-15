import clientPromise from "@/utils/mongodb";

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try{
      const client = await clientPromise;
      const db = client.db('shop-db');

      const products = await db
        .collection('products')
        .find({})
        .limit(20)
        .toArray()

        res.json(products)

    }catch(error){
      return res.status(404).end({ error: 'Failed to fetch products!' })
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(425).end(`method ${req.method} is not allowed.`);
};

export default handler;
