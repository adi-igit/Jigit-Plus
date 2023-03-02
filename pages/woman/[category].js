/* eslint-disable @next/next/no-img-element */
import FooterMain from '@/components/FooterMain';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import { paginate } from '@/lib/helper';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import clientPromise from '@/utils/mongodb';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getStaticPaths({ locales }) {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db.collection('products').find({}).toArray();

  if (!products) return console.error('Failed to fetch products!');

  const product = products.map((p) => p.category);
  const paths = product
    .map((category) =>
      locales.map((locale) => ({
        params: { category: category.toString() },
        locale,
      }))
    )
    .flat();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = await clientPromise;
  const db = client.db('shop-db');

  const products = await db
    .collection('products')
    .find({ category: `${params.category}`, gender: 'woman' })
    .sort({ _id: -1 })
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

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <>
      <Head>
        <title>{t.headWoman} - JIGIT</title>
        <meta name="description" content={`${t.headWoman} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full w-full relative">
        <Navbar />
        <div className="pt-[100px]">
          <h1 className="text-center text-[50px]">JIGIT+</h1>
          <p className="text-[14px] text-center p-[10px]">{t.about}</p>
        </div>
        <div className="min-h-[100vh] p-[30px] flex gap-[30px] justify-center items-center flex-wrap">
          {paginatedPosts.map((product) => (
            <div className="mt-[10px] w-max h-max" key={product._id}>
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
      </main>
      <FooterMain />
    </>
  );
}
