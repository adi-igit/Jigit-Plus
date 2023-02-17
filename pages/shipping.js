import CheckoutWizard from '@/components/CheckoutWizard';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useFormik } from 'formik';
import { shippingAddressValidate } from '@/lib/validate';
import FooterMain from '@/components/FooterMain';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '@/redux/reducer';
// import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// export async function getServerSideProps({ req }){
//   const session = await getSession({ req });

//   if(!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       }
//     }
//   }

  // authorize user return session
//   return {
//     props: { session }
//   }
// }

export default function Shipping() {
  const router = useRouter();
  const dispatch = useDispatch();
  //formik hook
  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    validate: shippingAddressValidate,
    onSubmit,
  });

  function onSubmit({ fullName, address, city, postalCode, country }) {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    router.push('/payment')
  }

  return (
    <div>
      <Head>
        <title>Shipping - JIGIT</title>
        <meta name="description" content="Shipping - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-[100px]">
        <CheckoutWizard activeStep={1} />
        <form
          className="mx-auto md:w-[35%] py-12 px-5"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mb-4 text-xl sm:text-2xl">Shipping address</h1>
          <div className="mb-4">
            <label htmlFor="fullName" className="text-[16px] text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`w-full border-b p-1 outline-none ${
                formik.errors.fullName && formik.touched.fullName
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.fullName && formik.touched.fullName
                  ? 'Required...'
                  : ''
              }`}
              {...formik.getFieldProps('fullName')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={`w-full border-b p-1 outline-none ${
                formik.errors.address && formik.touched.address
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.address && formik.touched.address
                  ? 'Required...'
                  : ''
              }`}
              {...formik.getFieldProps('address')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={`w-full border-b p-1 outline-none ${
                formik.errors.city && formik.touched.city
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.city && formik.touched.city ? 'Required...' : ''
              }`}
              {...formik.getFieldProps('city')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="text-gray-600">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className={`w-full border-b p-1 outline-none ${
                formik.errors.postalCode && formik.touched.postalCode
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.postalCode && formik.touched.postalCode
                  ? 'Required...'
                  : ''
              }`}
              {...formik.getFieldProps('postalCode')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="text-gray-600">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className={`w-full border-b p-1 outline-none ${
                formik.errors.country && formik.touched.country
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.country && formik.touched.country
                  ? 'Required...'
                  : ''
              }`}
              {...formik.getFieldProps('country')}
            />
          </div>
          <div>
            <button
              type="submit"
              className="primary-button"
            >
              Next
            </button>
          </div>
        </form>
      </main>
      <FooterMain />
    </div>
  );
}
