import { useState } from 'react';
import ImageHandler from '@/components/ImageHandler';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { useSelector, useDispatch } from 'react-redux';
import { cartAddItem } from '@/redux/reducer';
import FooterMain from '@/components/FooterMain';
import ProductItem from '@/components/ProductItem';
import { SiMinutemailer } from 'react-icons/si';
import { useFormik } from 'formik';
import { contactForm } from '@/lib/validate';
import { sendContactForm } from '@/lib/helper';
import { toast } from 'react-toastify';

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db.collection('products').find({}).toArray();

  if (!products) return console.error('Failed to fetch products!');

  return {
    paths: products.map((product) => ({
      params: { id: product._id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db('shop-db');
  const id = params.id.toString();
  const o_id = new ObjectId(id);

  const product = await db.collection('products').findOne({ _id: o_id });
  const relatedProducts = await db
    .collection('products')
    .find({ category: product.category, gender: product.gender })
    .toArray();

  if (!product) return console.error('Failed to fetch product!');
  if (!relatedProducts) return console.error('Failed to fetch product!');

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    },
    revalidate: 10,
  };
}

export default function ProductId({ product, relatedProducts }) {
  const [selectedImg, setSelectedImg] = useState('');
  const [show, setShow] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [size, setSize] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const [color, setColor] = useState(null);
  const [visible, setVisible] = useState(false);
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
    try {
      await sendContactForm(values);
      setVisible(false);
      toast.success('Message sent.')
    } catch (error) {
      setError(error.message);
    }
  }

  const state = useSelector((state) => state.app.cart.cartItems);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const existItem = state.find((x) => x._id === id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    if (!size) {
      alert('Please select size');
    } else {
      dispatch(cartAddItem({ ...product, quantity, color, size }));
      router.push('/cart');
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} - JIGIT</title>
        <meta name="description" content="Product - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="w-full h-full px-[5px] pt-[70px] md:pt-[100px] lg:pt-[20px]">
        <Link href="/products" passHref>
          <h3 className="pt-[80px] m-2 w-max mt-5 sm:mt-0 mx-5 text-sm underline cursor-pointer text-gray-600">
            Back to Shop
          </h3>
        </Link>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="lg:w-[30%] ">
            <div className="pr-4 h-[300px] mx-5 text-[12px] overflow-x-hidden overflow-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#000]/80">
              <h3 className="font-[500] mb-8">MATERIALS AND CARE</h3>
              <p className="font-[500] mb-4">MATERIALS</p>
              <p className="text-gray-600 mb-4">{product.materialsTextOne}</p>
              <p className="mb-4 text-gray-600">{product.materialsTextTwo}</p>
              &nbsp;
              <p
                onClick={() => setToggleState(true)}
                className={`${
                  toggleState === true && 'hidden'
                } underline text-gray-600 cursor-pointer`}
              >
                View more
              </p>
              {toggleState ? (
                <>
                  <div className="flex flex-col mb-4">
                    <p className="text-[14px] font-[500]">Main Fabrick</p>
                    <p>{product.mainFabrick}</p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="text-[14px] font-[500]">
                      Additional Material
                    </p>
                    <p>{product.additionalMaterial}</p>
                  </div>
                  <p className="font-[500]">CARE</p>
                  <p className="text-[12px] text-gray-600 mb-4">
                    {product.careTextOne}
                  </p>
                  <p className="text-[12px] text-gray-600 mb-6">
                    {product.careTextTwo}
                  </p>
                  <p className="text-[12px] text-gray-600 mb-1">
                    {product.careTextThree}
                  </p>
                  <p className="text-[12px] text-gray-600 mb-1">
                    {product.careTextFour}
                  </p>
                  <p className="text-[12px] text-gray-600 mb-1">
                    {product.careTextFive}
                  </p>
                  <p className="text-[12px] text-gray-600 mb-1">
                    {product.careTextSix}
                  </p>
                  <p className="text-[12px] text-gray-600 mb-6">
                    {product.careTextSeven}
                  </p>
                  <p
                    onClick={() => setToggleState(false)}
                    className="underline cursor-pointer"
                  >
                    View less
                  </p>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          {/* Display images with function of changing images */}
          <ImageHandler
            src={
              show
                ? product.imagesDifColor[selectedImg] ||
                  product.imagesDifColor[0]
                : product.imagesColor[selectedImg] || product.imagesColor[0]
            }
            selectedImg={selectedImg}
            images={show ? product.imagesDifColor : product.imagesColor}
            setSelectedImg={setSelectedImg}
          />

          <div className="px-2 lg:w-[25%] lg:mr-10 mt-20">
            <div>
              <div className="flex lg:justify-center items-center gap-5">
                <h1 className="text-[18px] font-[500]">{product.name}</h1>
              </div>
              <p className="mt-4 text-[12px] text-gray-600">
                {product.descriptionOne}
              </p>
              <div className="flex gap-4 mt-4">
                {product.colors &&
                  product.colors.map((item, i) => (
                    <>
                      <div
                        key={i}
                        className={`${item ? 'inline-block' : 'hidden'}`}
                        onClick={() =>
                          setColor(show ? product.slug : product.slug2)
                        }
                      >
                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                          style={{ backgroundColor: `${item}` }}
                          className="p-2 rounded-full"
                          value={item}
                        ></button>
                      </div>
                    </>
                  ))}
              </div>
              <p className="mt-5 text-gray-600 text-[12px]">
                {show ? product.slug2 : product.slug}
              </p>
              <p className="mt-4 text-gray-600 text-[12px]">
                {product.price.toFixed(2)} EUR
              </p>
              <div className="input-sizes flex flex-col my-4 border-t border-b border-black">
                {product.sizes.map((size, i) => (
                  <div key={i} className="flex flex-col">
                    <input
                      onClick={(e) => setSize(e.target.value)}
                      type="radio"
                      id={size}
                      name="size"
                      value={size}
                    />
                    <label
                      className="w-full cursor-pointer text-[12px] text-gray-600 my-1 hover:bg-gray-700/20"
                      htmlFor={size}
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-[12px] mt-2">SIZE GUIDES</p>
              <div className="mt-2 flex justify-between text-[12px] text-gray-600">
                <p>Status</p>
                <p>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</p>
              </div>
              <button
                onClick={addToCartHandler}
                className="w-full mt-5 py-[7px] text-[12px] font-[600] bg-black text-white tracking-widest cursor-pointer hover:scale-[1.02] duration-300"
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-20 pb-32">
        <h1 className="text-lg font-[500] mt-40 mb-10">RELATED PRODUCTS</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts?.map((product) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>
      </div>
      <div className="relative">
        {visible && (
          <div className="flex sm:w-[300px] rounded-md fixed right-5 bottom-[75px] bg-gray-300">
            <form
              onSubmit={formik.handleSubmit}
              className="submit-btn w-full flex flex-col m-3"
            >
              <h1 className="text-center text-2xl px-2">Contact</h1>
              {error && (
                <p className="text-center text-red-500 text-sm">{error}</p>
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
            onClick={() => setVisible(!visible)}
          />
        </span>
      </div>
      <FooterMain />
    </>
  );
}
