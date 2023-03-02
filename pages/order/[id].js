import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import { getError } from '@/utils/error';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';

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

  // authorize user return session
  return {
    props: { session },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: true, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: true, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    default:
      state;
  }
}

export default function Order() {
  // order/:id

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { query } = useRouter();
  const orderId = query.id;

  const [
    { loading, error, order, successPay, loadingPay },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data[0] });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || successPay || (order.id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadingPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal');
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadingPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successPay]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data[0] });
        toast.success(`${t.orderToastSuccess}`);
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(`${t.orderToastError}`);
        console.log(getError(err))
      }
    });
  };

  const onError = (err) => {
    toast.error(getError(err));
  };

  return (
    <div>
      <Head>
        <title>{orderId} - JIGIT</title>
        <meta name="description" content={`${t.headOrder} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-[100px] px-2">
        <h1 className="mb-4 text-xl sm:text-2xl">{`${t.orderText} ${orderId}`}</h1>
        {loading ? (
          <div>{t.orderLoading}</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card  p-5">
                <h2 className="mb-2 text-lg">{t.orderShippingAddress}</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </div>
                {isDelivered ? (
                  <div className="alert-success">
                    {t.orderDeliveredAt} {deliveredAt}
                  </div>
                ) : (
                  <div className="alert-error">{t.orderNotDelivered}</div>
                )}
              </div>

              <div className="card p-5">
                <h2 className="mb-2 text-lg">{t.orderPaymentMethod}</h2>
                <div>{paymentMethod}</div>
                {isPaid ? (
                  <div className="alert-success">{t.orderPaidAt} {paidAt}</div>
                ) : (
                  <div className="alert-error">{t.orderNotPaid}</div>
                )}
              </div>

              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg">{t.orderItems}</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">{t.orderItem}</th>
                      <th className="    p-5 text-right">{t.orderQuantity}</th>
                      <th className="  p-5 text-right">{t.orderPrice}</th>
                      <th className="p-5 text-right">{t.orderSubtotal}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <Image
                              src={item.imageIntro}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className=" p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">${item.price}</td>
                        <td className="p-5 text-right">
                          ${item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg">{t.orderSummaryOrder}</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>{t.orderItemsText}</div>
                      <div>${itemsPrice}</div>
                    </div>
                  </li>{' '}
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>{t.orderTax}</div>
                      <div>${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>{t.orderShipping}</div>
                      <div>${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>{t.orderTotal}</div>
                      <div>${totalPrice}</div>
                    </div>
                  </li>
                  {!isPaid && (
                    <li>
                      {isPending ? (
                        <div>{t.orderLoading}</div>
                      ) : (
                        <div className="w-full">
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                      {loadingPay && <div>{t.orderLoading}</div>}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      <FooterMain />
    </div>
  );
}
