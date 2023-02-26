import CheckoutWizard from '@/components/CheckoutWizard';
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import { savePaymentMethod } from '@/redux/reducer';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

export default function Payment() {
  const state = useSelector((state) => state.app.cart);
  const { shippingAddress, paymentMethod } = state;
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  function submitHandler(e){
    e.preventDefault();
    if(!selectedPaymentMethod){
      return toast.error('Payment method is required')
    }
    dispatch(savePaymentMethod(selectedPaymentMethod));
    router.push('/placeorder')
  };

  useEffect(() => {
    if(!shippingAddress.address){
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || '')
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <div>
      <Head>
        <title>Payment - JIGIT</title>
        <meta name="description" content="Payment - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-[100px]">
        <CheckoutWizard activeStep={2} />
        <form
          className="md:w-[35%] mx-auto py-12 px-5"
          onSubmit={submitHandler}
        >
          <h1 className="mb-4 text-xl">Payment Method</h1>
          <div className="w-max mx-auto sm:flex gap-5 text-white">
            <div className="input-payment relative flex text-black border w-[150px] h-[150px] duration-500 hover:scale-[1.02] hover:border-b-[2px] hover:border-b-black">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                id="paypal"
                type="radio"
                checked={selectedPaymentMethod === 'paypal'}
                onChange={() => setSelectedPaymentMethod('paypal')}
              />
              <label
                className="absolute top-0 bottom-0 left-0 right-0 text-xl font-bold pl-11 pt-[55px] cursor-pointer"
                htmlFor="paypal"
              >
                <span className="text-[#15477C]">Pay</span>
                <span className="text-[#0E79BF]">pal</span>
              </label>
            </div>
          </div>
          <div className="mb-4 mt-32 flex justify-between">
            <button
              onClick={() => router.push('/shipping')}
              type="button"
              className="default-button"
            >
              Back
            </button>
            <button className="primary-button">Next</button>
          </div>
        </form>
      </main>
      <FooterMain />
    </div>
  );
}
