/* eslint-disable @next/next/no-img-element */
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import { paginate } from '@/lib/helper';
import clientPromise from '@/utils/mongodb';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db.collection('products').find({}).toArray();

  if (!products) return console.error('Failed to fetch products!');

  return {
    paths: products.map((product) => ({
      params: { category: product.category.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db
    .collection('products')
    .find({ category: `${params.category}`, gender: 'woman' })
    .toArray();

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

  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
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
      <main className="h-full w-full relative">
        <Navbar />
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
            <div className="mt-[10px] w-max h-max" key={product._id}>
              <div>
                <Link href={`/product/${product._id}`}>
                  <img
                    className="w-[300px] h-[400px] object-cover"
                    key={product._id}
                    src={product.imageIntro}
                    alt=""
                  />
                </Link>
                <div>
                  <h3 className="text-[12px] py-[5px]">{product.name}</h3>
                  <div className="flex justify-between">
                    <p className="text-[12px]">{product.category}</p>
                    <p className="text-[12px]">{product.slug}</p>
                  </div>
                  <button className="primary-button">ADD TO CART</button>
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
      </main>
      <FooterMain />
    </>
  );
}
