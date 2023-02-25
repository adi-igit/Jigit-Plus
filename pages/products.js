/* eslint-disable @next/next/no-img-element */
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import { paginate, sendContactForm } from '@/lib/helper';
import clientPromise from '@/utils/mongodb';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { SiMinutemailer } from 'react-icons/si';
import { useFormik } from 'formik';
import { contactForm } from '@/lib/validate';
import { toast } from 'react-toastify';

export async function getStaticProps() {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db.collection('products').find({}).sort({_id: -1}).limit(100).toArray();

  if (!products) return console.error('Failed to fetch products!');

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 10,
  };
}

export default function Products({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: contactForm,
    onSubmit,
  });

  async function onSubmit(values) {
    try{
      await sendContactForm(values);  
      setShow(false);
      toast.success('Message sent.')
    }catch(error){
      setError(error.message);
    }
  }

  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
    // Top: 0 takes us all the way back to the top of the page
    // Behavior: smooth keeps it smooth!
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    scrollToTop();
  };

  const paginatedPosts = paginate(products, currentPage, pageSize);

  return (
    <>
      <Head>
        <title>Products - JIGIT</title>
        <meta name="description" content="Products - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="h-full w-full relative">
        <div className="pt-[100px]">
          <h1 className="text-center text-[50px]">JIGIT+</h1>
          <p className="text-[14px] text-center p-[10px]">
            JIGIT has an ongoing commitment to its customers around the world in
            providing an excellent customer experience to all. As part of these
            efforts, we are committed to providing a website that is accessible
            to the widest possible audience, regardless of technology or
            ability. JIGIT is committed to aligning its website and its
            operations in substantial conformance with generally-recognized and
            accepted guidelines and/or standards for website accessibility (as
            these may change from time to time). To assist in these efforts,
            JIGIT has partnered with experienced internationally reputable
            consultants and is working to increase the accessibility and
            usability of our website.
          </p>
        </div>
        <div className="min-h-[100vh] p-[30px] flex gap-[30px] justify-center items-center flex-wrap">
          {paginatedPosts.map((product) => (
            <div className="mt-[10px] w-max h-max" key={product.slug}>
              <div>
                <Link href={`/product/${product._id}`}>
                  <div className="relative">
                    <img
                      className="w-[300px] h-[400px] object-cover"
                      key={product._id}
                      src={product.imageIntro}
                      alt=""
                    />
                    <button className="absolute bottom-5 left-[50%] text-1xl text-gray-300 border py-[2px] px-[10px] rounded-full bg-black/20">
                      +
                    </button>
                  </div>
                </Link>
                <div>
                  <h3 className="text-[12px] py-[5px]">{product.name}</h3>
                  <div className="flex justify-between">
                    <p className="text-[12px]">{product.category}</p>
                    <p className="text-[12px]">{product.slug}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          items={products.length} // 100
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
        />
        <div className="relative">
          {show && (
            <div className="flex sm:w-[300px] rounded-md fixed right-5 bottom-[75px] bg-gray-300">
              <form
                onSubmit={formik.handleSubmit}
                className="submit-btn w-full flex flex-col m-3"
              >
                <h1 className="text-center text-2xl px-2">Contact</h1>
                {error && (
                  <p className='text-center text-red-500 text-sm'>{error}</p>
                )}
                <div className="flex flex-col px-2 mb-1">
                  <label className="text-sm">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="outline-none border rounded-md text-sm p-1"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p className="text-[12px] text-red-500">
                      {formik.errors.name}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col px-2 mb-1">
                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="outline-none border rounded-md text-sm p-1"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="text-[12px] text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col px-2 mb-1">
                  <label className="text-sm">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="outline-none border rounded-md text-sm p-1"
                    {...formik.getFieldProps('subject')}
                  />
                  {formik.errors.subject && formik.touched.subject ? (
                    <p className="text-[12px] text-red-500">
                      {formik.errors.subject}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col px-2 mb-1">
                  <label className="text-sm">Message</label>
                  <textarea
                    type="text"
                    name="message"
                    className="outline-none border rounded-md text-sm h-[100px] bg-black/20"
                    {...formik.getFieldProps('message')}
                  />
                  {formik.errors.message && formik.touched.message ? (
                    <p className="text-[12px] text-red-500">
                      {formik.errors.message}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-900 rounded-sm text-white p-2 m-2 cursor-pointer"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          <span className="fixed right-5 bottom-5 px-2 py-2 bg-black/10 rounded-full cursor-pointer hover:bg-black/20">
            <SiMinutemailer
              size={30}
              className="text-blue-900"
              onClick={() => setShow(!show)}
            />
          </span>
        </div>
      </main>
      <FooterMain />
    </>
  );
}
