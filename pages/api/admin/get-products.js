import { getSession } from "next-auth/react";
import clientPromise from "@/utils/mongodb";

const handler = async(req, res) => {
  const session = await getSession({ req });

  if(!session && session.user.email === 'jigitreply@gmail.com'){
    return res.status(500).send({ error: 'Not authenticated as an admin...!' })
  }

  if(req.method === 'GET'){
    const client = await clientPromise;
    const db = client.db('shop-db');
    const result = await db.collection('products').find({}).toArray();
    res.send(result)
  }else{
    res.status(500).send({ Error: "Failed to fetch products" })
  }
}

export default handler;