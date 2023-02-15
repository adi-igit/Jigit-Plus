import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { useFormik } from 'formik';
import { registerValidate } from '@/lib/validate';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

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
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };

    await fetch('https://jigit-shop.vercel.app/api/auth/signup', options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push('https://jigit-shop.vercel.app');
        }
      });
  }

  return (
    <>
      <Head>
        <title>Register - JIGIT</title>
        <meta name="description" content="Register - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="pt-[100px]">
        <form
          className="mx-auto md:w-[50%] lg:w-[30%] border py-12 px-5 text-[14px]"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="mb-4 text-xl font-bold">Sign Up</h1>
          <div className="mb-4">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="Username"
              className="w-full border outline-none"
              id="name"
              {...formik.getFieldProps('username')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps('email')}
              className="w-full border outline-none"
              id="email"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border outline-none"
              id="password"
              {...formik.getFieldProps('password')}
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full border outline-none"
              type="password"
              name="cpassword"
              id="confirmPassword"
              {...formik.getFieldProps('cpassword')}
            />
          </div>

          <div className="mb-4 ">
            <button className="w-full my-2 py-2 bg-black text-white rounded-md hover:scale-[1.01] duration-300">Register</button>
          </div>
          <div className="mb-4 ">
             Have an account? &nbsp;
            <Link href={'/login'} className='underline font-bold'>Sign In</Link>
          </div>
        </form>
      </div>
    </>
  );
}
