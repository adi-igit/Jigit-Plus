import React from 'react';
import { getSession } from 'next-auth/react';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  //authorize user return session
  return {
    props: { session },
  };
}

export default function Shipping() {
  return <div>Shipping</div>;
}
