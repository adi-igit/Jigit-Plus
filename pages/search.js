/* eslint-disable @next/next/no-img-element */
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import clientPromise from '@/utils/mongodb';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useMemo } from 'react';

export async function getStaticProps() {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db.collection('products').find({}).toArray();

  if (!products) return console.error('Failed to fetch products!');

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 10,
  };
}

export default function Search({ products }) {
  const [filter, setFilter] = useState('');

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, products]
  );

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <>
      <Head>
        <title>Search - JIGIT</title>
        <meta name="description" content={`${t.headSearch} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="pt-[100px]">
        <div>
          <input
            placeholder={`${t.searchInput}`}
            className="w-[90%] my-5 mx-2 p-2 text-[14px] border-b-[1px] border-b-black outline-none"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </div>
        <p className="mt-10 px-2 text-[14px] font-bold">{t.searchInterested}</p>
        <>
          <main className="h-full w-full relative">
            <div className="min-h-[100vh] p-[30px] flex gap-[30px] justify-center items-center flex-wrap">
              {filteredProducts.map((product) => (
                <div className="mt-[10px] w-max h-max" key={product.slug}>
                  <div>
                    <div className="relative">
                      <Link href={`/product/${product._id}`}>
                        <img
                          className="w-[300px] h-[400px] object-cover"
                          key={product._id}
                          src={product.imageIntro}
                          alt=""
                        />
                      </Link>
                      <button className="absolute bottom-5 left-[50%] text-1xl text-gray-300 border py-[2px] px-[10px] rounded-full bg-black/20">
                        +
                      </button>
                    </div>
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
          </main>
          <FooterMain />
        </>
      </div>
    </>
  );
}
