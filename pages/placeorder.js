import CheckoutWizard from '@/components/CheckoutWizard';
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import { cartClearItems } from '@/redux/reducer';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const BASE_URL = 'https://jigit-shop.vercel.app';

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

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.app.cart);
  const { cartItems, shippingAddress, paymentMethod } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    setLoading(true);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }),
    };

    await fetch(`${BASE_URL}/api/orders`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false);
          dispatch(cartClearItems());
          router.push(`/order/${data.insertedId}`);
        }
      });
  };

  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <div>
      <Head>
        <title>{t.headPlaceOrder} - JIGIT</title>
        <meta name="description" content={`${t.headPlaceOrder} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="pt-[100px]">
        <CheckoutWizard activeStep={3} />
      </div>
      <main className="sm:py-12 sm:px-5 sm:mb-[200px]">
        <h1 className="mb-4 text-xl sm:text-2xl">{t.placeOrder}</h1>
        {state.length === 0 ? (
          <div className="">
            {t.placeOrderCartIsEmpty}
            <Link href="/products">{t.placeOrderGoShopping}</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card p-5">
                <h2 className="mb-2 text-lg">{t.placeOrderShippingAddress}</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </div>
                <div>
                  <Link href="/shipping" className="flex gap-2 items-center">
                    <AiOutlineEdit size={20} className="text-yellow-800" />
                    <p>{t.placeOrderEdit}</p>
                  </Link>
                </div>
              </div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg">{t.placeOrderPaymentMethod}</h2>
                <div>{paymentMethod}</div>
                <div>
                  <Link href="/payment" className="flex gap-2 items-center">
                    <AiOutlineEdit size={20} className="text-yellow-800" />
                    <p>{t.placeOrderEdit}</p>
                  </Link>
                </div>
              </div>
              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg">{t.placeOrderOrderItems}</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">{t.placeOrderItem}</th>
                      <th className="p-5 text-right">{t.placeOrderQuantity}</th>
                      <th className="p-5 text-right">{t.placeOrderPrice}</th>
                      <th className="p-5 text-right">{t.placeOrderSubtotal}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
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
                <div className="mt-4">
                  <Link href="/cart" className="flex gap-2 items-center">
                    <AiOutlineEdit size={20} className="text-yellow-800" />
                    <p>{t.placeOrderEdit}</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card p-5 h-max">
              <h2 className="mb-2 text-lg">{t.placeOrderSummaryOrder}</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>{t.placeOrderItems}</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>{t.placeOrderTax}</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>{t.placeOrderShipping}</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>{t.placeOrderTotal}</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? `${t.placeOrderButtonLoading}` : `${t.placeOrderButtonPlaceOrder}`}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
      <FooterMain />
    </div>
  );
}
