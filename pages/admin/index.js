import Layout from '@/components/admin/Layout';
import { getSession } from 'next-auth/react';
import React from 'react';
import Home from '../../components/admin/Home';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session || session.user.email !== 'jigitreply@gmail.com') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // authorize user return session
  return {
    props: { session },
  };
}

export default function AdminHome() {
  return (
  <Layout title='Dashboard'>
    <Home />
  </Layout>
  );
}
