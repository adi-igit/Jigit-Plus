import Navbar from '@/components/Navbar';
import { cartAddItem, cartRemoveItem } from '@/redux/reducer';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SlClose } from 'react-icons/sl';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Cart() {
  const router = useRouter();
  const state = useSelector((state) => state.app.cart.cartItems);
  const dispatch = useDispatch();
  const removeItemHandler = (item) => {
    console.log(item);
    dispatch(cartRemoveItem(item));
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch(cartAddItem({ ...item, quantity }));
    setCookie(state);
  };

  return (
    <>
      <Head>
        <title>Cart - JIGIT</title>
        <meta name="description" content="Product - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="pt-[120px] px-[50px]">
        <h1 className="mb-4 text-lg">Shopping Cart</h1>
        {state.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go Shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-h-full w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-center">Size</th>
                    <th className="p-5 text-center">Color</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((item, i) => (
                    <tr key={i} className="border-b">
                      <td>
                        <Link
                          href={`product/${item._id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.imageIntro}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">{item.size}</td>
                      <td className="p-5 text-right">{item.color}</td>
                      <td className="p-5 text-right">EUR {item.price}</td>
                      <td className="text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <SlClose className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <ul>
                <li>
                  <div className="pb-8 text-lg">
                    Subtotal ({state.reduce((a, c) => a + c.quantity, 0)}) :{' '}
                    {state
                      .reduce((a, c) => a + c.quantity * c.price, 0)
                      .toFixed(2)}{' '}
                    EUR
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('login?redirect=/shipping')}
                    className="primary-button w-full"
                  >
                    CHECK OUT
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
