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
  const [color, setColor] = useState(product.slug);

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
      <div className="w-full h-full px-[5px] pt-[120px] md:pt-[110px] lg:pt-[50px] pb-[50px]">
        <Link href="/products" passHref>
          <h3 className="mb-6 sm:mb-0 mt-5 sm:mt-20 mx-5 text-sm underline cursor-pointer text-gray-600">
            Back to Shop
          </h3>
        </Link>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {product.descriptionTwo?.map((desc, i) => (
            <div key={i} className="lg:w-[30%] ">
              <div className="pr-4 h-[300px] mx-5 text-[12px] overflow-x-hidden overflow-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#000]/80">
                <h3 className="font-[500] mb-8">MATERIALS AND CARE</h3>
                <p className="font-[500] mb-4">MATERIALS</p>
                <p className="text-gray-600 mb-4">{desc.materialsTextOne}</p>
                <p className="mb-4 text-gray-600">{desc.materialsTextTwo}</p>
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
                    {desc.outerShell ? (
                      <p className="font-[500]">OUTERSHELL</p>
                    ) : (
                      ''
                    )}
                    <p className="text-[12px] text-gray-600 mb-4">
                      {desc.outerShell}
                    </p>
                    {desc.lining ? <p className="font-[500]">LINING</p> : ''}
                    <p className="text-[12px] text-gray-600 mb-4">
                      {desc.lining}
                    </p>
                    <p className="font-[500]">CARE</p>
                    <p className="text-[12px] text-gray-600 mb-4">
                      {desc.careTextOne}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-6">
                      {desc.careTextTwo}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextThree}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextFour}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextFive}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextSix}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-6">
                      {desc.careTextSeven}
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
          ))}

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

          <div className="px-2 lg:w-[20%] lg:mr-20 mt-20">
            <div>
              <div className="flex lg:justify-center items-center gap-5">
                <h1 className="text-[18px] font-[500]">{product.name}</h1>
              </div>
              <p className="mt-4 text-[12px] text-gray-600">
                {product.descriptionOne}
              </p>
              <div className="flex gap-4 mt-4">
                {product.colors.map((item, i) => (
                  <>
                    <div
                      key={i}
                      className={`${item.title ? 'inline-block' : 'hidden'}`}
                      onClick={() =>
                        setColor(show ? product.slug : product.slug2)
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        style={{ backgroundColor: `${item.title}` }}
                        className="p-2 rounded-full"
                        value={item.title}
                      ></button>
                    </div>
                  </>
                ))}
              </div>
              <p className="mt-5 text-gray-600 text-[12px]">
                {show ? product.no : product.slug}
              </p>
              <p className="mt-4 text-gray-600 text-[12px]">
                {product.price.toFixed(2)} EUR
              </p>
              <div className="input-sizes flex flex-col my-4 border-t border-b border-black">
                {product.sizes.map((size, i) => (
                  <>
                    <input
                      key={i}
                      onClick={(e) => setSize(e.target.value)}
                      type="radio"
                      id={size.title}
                      name="size"
                      value={size.title}
                    />
                    <label
                      className="cursor-pointer text-[12px] text-gray-600 my-1 hover:bg-gray-700/20"
                      htmlFor={size.title}
                    >
                      {size.title}
                    </label>
                  </>
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
      <FooterMain />
    </>
  );
}
