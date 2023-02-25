import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import login_validate from '@/lib/validate';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const BASE_URL = 'https://jigit-shop.vercel.app';

export default function Login() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session]);

  //formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });

    if (status.ok) {
      router.push(status.url);
    }
    if (!status.ok) {
      toast.error('Invalid email or password...')
    }
  }

  //Google handler function
  const handleGoogleSignin = async () => {
    signIn('google', {
      callbackUrl: `${BASE_URL}/${redirect || ''}`,
    });
  };

  return (
    <>
      <Head>
        <title>Login - JIGIT</title>
        <meta name="description" content="Login - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="pt-[100px]">
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto md:w-[50%] lg:w-[30%] border py-12 px-5"
        >
          <h1 className="mb-4 text-xl font-[600]">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${formik.errors.email && formik.touched.email ? 'border-red-500' : ''} w-full border outline-none p-1 rounded-md`}
              {...formik.getFieldProps('email')}
            />
          </div>
          <div
            className='mb-4'
          >
            <label htmlFor="password" className="text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${formik.errors.password && formik.touched.password ? 'border-red-500' : ''} w-full border outline-none p-1 rounded-md`}
              autoFocus
              {...formik.getFieldProps('password')}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full my-2 border rounded-md py-2 flex justify-center gap-2 text-white bg-black hover:bg-gray-200 hover:border-blue-900 hover:text-black"
            >
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              onClick={handleGoogleSignin}
              type="button"
              className="w-full border rounded-md py-2 flex justify-center gap-2 hover:bg-gray-200"
            >
              Sign In with Google{' '}
              <Image
                alt=""
                src={'/assets/google.svg'}
                width={20}
                height={20}
              ></Image>
            </button>
          </div>
          <div className="mt-4 text-sm">
            Don&apos;t have an account? &nbsp;
            <Link
              href="/register"
              className="text-sm font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
