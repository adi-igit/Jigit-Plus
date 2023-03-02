import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { registerValidate } from '@/lib/validate';
import { useRouter } from 'next/router';
import { sendEmailSignup, signUp } from '@/lib/helper';
import { toast } from 'react-toastify';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';

const BASE_URL = 'https://jigit-shop.vercel.app';

export default function Register() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      await signUp(values);
      router.push(`${BASE_URL}/login`);
      await sendEmailSignup(values);
    } catch (error) {
      toast.error(`${t.registerToastError}`);
    }
  };


  return (
    <>
      <Head>
        <title>{t.headRegister} - JIGIT</title>
        <meta name="description" content={`${t.headRegister} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="pt-[100px]">
        <form
          className="mx-auto md:w-[50%] lg:w-[30%] border py-12 px-5 text-[14px]"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mb-4 text-xl font-bold">{t.registerText}</h1>
          <div className="mb-4">
            <label htmlFor="name">{t.registerUsername}</label>
            <input
              type="text"
              name="Username"
              className={`${
                formik.errors.username && formik.touched.username
                  ? 'border-red-500'
                  : ''
              } w-full border outline-none p-1 rounded-md`}
              id="name"
              {...formik.getFieldProps('username')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email">{t.registerEmail}</label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps('email')}
              className={`${
                formik.errors.email && formik.touched.email
                  ? 'border-red-500'
                  : ''
              } w-full border outline-none p-1 rounded-md`}
              id="email"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="password">{t.registerPassword}</label>
            <input
              type="password"
              name="password"
              className={`${
                formik.errors.password && formik.touched.password
                  ? 'border-red-500'
                  : ''
              } w-full border outline-none p-1 rounded-md`}
              id="password"
              {...formik.getFieldProps('password')}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">{t.registerConfirmPassword}</label>
            <input
              className={`${
                formik.errors.cpassword && formik.touched.cpassword
                  ? 'border-red-500'
                  : ''
              } w-full border outline-none p-1 rounded-md`}
              type="password"
              name="cpassword"
              id="confirmPassword"
              {...formik.getFieldProps('cpassword')}
            />
          </div>

          <div className="mb-4 ">
            <button className="w-full my-2 py-2 bg-black text-white rounded-md hover:scale-[1.01] duration-300">
              {t.registerButton}
            </button>
          </div>
          <div className="mb-4 ">
            {t.registerButton} &nbsp;
            <Link href={'/login'} className="underline font-bold">
              {t.registerButtonSignIn}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
