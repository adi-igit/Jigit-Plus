/* eslint-disable react/jsx-no-duplicate-props */
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import { updateProfileValidate } from '@/lib/validate';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import { getError } from '@/utils/error';
import axios from 'axios';
import { useFormik } from 'formik';
import { getSession, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

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

export default function Profile() {
  //formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: updateProfileValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const { name, email, password } = values;
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      toast.success(`${t.updateProfileToastSuccess}`);

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(`${t.updateProfileToastError}`);
      console.log(getError(err))
    }
  }

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <div>
      <Head>
        <title>{t.headUpdateProfile} - JIGIT</title>
        <meta name="description" content={`${t.headUpdateProfile} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-[100px] px-2">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto md:w-[50%] lg:w-[30%] border py-12 px-5"
        >
          <h1 className="mb-4 text-xl sm:text-2xl">{t.updateProfileText}</h1>

          <div className="mb-4">
            <label htmlFor="name">{t.updateProfileName}</label>
            <input
              type="name"
              id="name"
              {...formik.getFieldProps('name')}
              className={`w-full border-b p-1 outline-none ${
                formik.errors.name && formik.touched.name
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.name && formik.touched.name
                  ? `${t.updateProfileValidateRequired}`
                  : ''
              }`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">{t.updateProfileEmail}</label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              className={`w-full border-b p-1 outline-none ${
                formik.errors.email && formik.touched.email
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.email && formik.touched.email
                  ? `${t.updateProfileValidateRequired}`
                  : ''
              }`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">{t.updateProfilePassword}</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps('password')}
              className={`w-full border-b p-1 outline-none ${
                formik.errors.password && formik.touched.password
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.password && formik.touched.password
                  ? `${t.updateProfileValidateRequired}`
                  : ''
              }`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cpassword">{t.updateProfileConfirmPassword}</label>
            <input
              type="password"
              id="cpassword"
              {...formik.getFieldProps('cpassword')}
              className={`w-full border-b p-1 outline-none ${
                formik.errors.cpassword && formik.touched.cpassword
                  ? 'placeholder-gray-500 text-sm p-1'
                  : ''
              }`}
              placeholder={`${
                formik.errors.cpassword && formik.touched.cpassword
                  ? `${t.updateProfileValidateRequired}`
                  : ''
              }`}
            />
          </div>
          <div>
            <button type="submit" className="primary-button">
              {t.updateProfileButtonUpdate}
            </button>
          </div>
        </form>
      </main>
      <FooterMain />
    </div>
  );
}
