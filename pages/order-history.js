import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import { getError } from '@/utils/error';
import Head from 'next/head';
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';

export async function getServerSideProps({ req }){
  const session = await getSession({ req });

  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  // authorize user return session
  return {
    props: { session }
  }
}

function reducer(state, actions) {
  switch(actions.type){
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: actions.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: actions.payload };
    default: 
      return state;
    }
}

export default function OrderHistory() {
  const [{loading, error, orders}, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <div>
      <Head>
        <title>{t.headOrderHistory} - JIGIT</title>
        <meta name="description" content={`${t.headOrderHistory} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="min-h-screen pt-[100px] px-2">
        <h1 className='mb-4 text-xl sm:text-2xl'>{t.orderHistoryText}</h1>
        {loading ? (
          <div>{t.orderHistoryLoading}</div>
        ) : error ? ( 
          <div className='alert-error'>{error}</div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>{t.orderHistoryId}</th>
                  <th className='p-5 text-left'>{t.orderHistoryDate}</th>
                  <th className='p-5 text-left'>{t.orderHistoryTotal}</th>
                  <th className='p-5 text-left'>{t.orderHistoryPaid}</th>
                  <th className='p-5 text-left'>{t.orderHistoryDelivered}</th>
                  <th className='p-5 text-left'>{t.orderHistoryAction}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className='border-b'>
                    <td className='p-5'>{order._id.substring(20, 24)}</td>
                    <td className='p-5'>{order.createdAt}</td>
                    <td className='p-5'>${order.totalPrice}</td>
                    <td className='p-5'>
                      {order.isPaid ? `${order.paidAt.substring(0, 10)}` : 'not paid'}
                    </td>
                    <td className='p-5'>
                      {order.isDelivered ? `${order.deliveredAt.substring(0, 10)}` : 'not delivered'}
                    </td>
                    <td className='p-5 text-blue-900'>
                      <Link href={`/order/${order._id}`} passHref>
                        {t.orderHistoryDetails}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        }
      </main>
      <FooterMain />
    </div>
  );
}
