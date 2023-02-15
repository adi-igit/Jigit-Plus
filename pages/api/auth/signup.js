import clientPromise from '@/utils/mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('shop-db');

  //only post method is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res.status(404).send({ error: 'Do not have form data...!' });

    const { username, email, password } = req.body;

    //check duplicate users
    const checkExisting = await db.collection('users').findOne({ email });

    if (checkExisting)
      return res.status(422).send({ message: 'User already exists...!' });

    //hash password
    const user = await db.collection('users').insertOne({
      username,
      email,
      password: await hash(password, 12),
      isAdmin: false,
    });

    res.status(201).send(user);
  } else {
    res
      .status(500)
      .send({ message: 'HTTP method not valid only post Accepted' });
  }
}
