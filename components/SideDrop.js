import React, { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SideDrop({ drop, setDrop }) {
  const [category, setCategory] = useState(1);
  const [categoryKids, setCategoryKids] = useState(0);

  const { data: man, error: errorMan } = useSWR('/api/gender/man', fetcher);
  const { data: woman, error: errorWoman } = useSWR(
    '/api/gender/woman',
    fetcher
  );
  const { data: kidsBoy, error: errorKidsBoy } = useSWR(
    '/api/gender/kids-boy',
    fetcher
  );

  const { data: kidsGirl, error: errorKidsGirl } = useSWR(
    '/api/gender/kids-girl',
    fetcher
  );

  // if you want you can display error directly in ui
  // if (errorMan) return <div>Failed to load</div>;
  // if (errorWoman) return <div>Failed to load</div>;
  // if (errorKidsBoy) return <div>Failed to load</div>;
  // if (errorKidsGirl) return <div>Failed to load</div>;
  // if (!man) return <div>Loading...</div>;
  // if (!woman) return <div>Loading...</div>;
  // if (!kidsBoy) return <div>Loading...</div>;

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <>
      {drop && (
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          className="h-full w-[300px] sm:w-[400px] fixed bg-white text-black z-[999]"
          whileInView={{ once: false }}
        >
          <TfiClose
            size={20}
            className="m-[20px] cursor-pointer"
            onClick={() => setDrop(false)}
          />
          <div className="flex gap-[20px] px-[20px]">
            <p
              onClick={() => setCategory(1)}
              className={`${
                category === 1 ? 'border-b font-bold' : ''
              } text-[14px] cursor-pointer`}
            >
              {t.man}
            </p>
            <p
              onClick={() => setCategory(2)}
              className={`${
                category === 2 ? 'border-b font-bold' : ''
              } text-[14px] cursor-pointer`}
            >
              {t.woman}
            </p>
            <p
              onClick={() => setCategory(3)}
              className={`${
                category === 3 ? 'border-b font-bold' : ''
              } text-[14px] cursor-pointer`}
            >
              {t.kids}
            </p>
          </div>

          {/* Changing Category by state */}

          {/* For man category */}
          {category === 1 && (
            <>
              <ul className="p-[30px] sm:p-[20px]">
                {man?.map((product, i) => (
                  <Link href={`/man/${product.category}`} key={i}>
                    <li
                      className="text-[13px] my-[5px]"
                      onClick={() => setDrop(false)}
                    >
                      {product.categoryLink}
                    </li>
                  </Link>
                ))}
              </ul>
              <p className="text-[14px] px-[20px] mb-[10px]">
                {t.specialEdition}
              </p>
              <p className="text-[16px] py-[5px] px-[20px] bg-yellow-400 text-black">
                {t.sale}
              </p>
            </>
          )}
          {/* For woman category */}
          {category === 2 && (
            <>
              <ul className="p-[30px] sm:p-[20px]">
                {woman.map((product, i) => (
                  <Link href={`/woman/${product.category}`} key={i}>
                    <li
                      className="text-[13px] my-[10px] sm:my-[5px]"
                      onClick={() => setDrop(false)}
                    >
                      {product.categoryLink}
                    </li>
                  </Link>
                ))}
              </ul>
              <p className="text-[14px] px-[20px] mb-[10px]">
                {t.specialEdition}
              </p>
              <p className="text-[16px] py-[5px] px-[20px] bg-yellow-400 text-black">
                {t.sale}
              </p>
            </>
          )}
          {/* For kids category */}
          {category === 3 && (
            <>
              <div className="px-10 my-6 text-[13px]">
                <p
                  onClick={() => setCategoryKids(1)}
                  className={`${
                    categoryKids === 1 && 'font-bold border-b'
                  } cursor-pointer`}
                >
                  BOYS | 6-14 YEARS
                </p>
                {categoryKids === 1 && (
                  <ul className="p-[30px] sm:p-[20px]">
                    {kidsBoy.map((product, i) => (
                      <Link href={`/kids-boy/${product.category}`} key={i}>
                        <li
                          className="text-[13px] my-[5px]"
                          onClick={() => setDrop(false)}
                        >
                          {product.categoryLink}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
                <p
                  onClick={() => setCategoryKids(2)}
                  className={`${
                    categoryKids === 2 && 'font-bold border-b'
                  } cursor-pointer`}
                >
                  GIRLS | 6-14 YEARS
                </p>
                {categoryKids === 2 && (
                  <ul className="p-[30px] sm:p-[20px]">
                    {kidsGirl.map((product, i) => (
                      <Link href={`/kids-girl/${product.category}`} key={i}>
                        <li
                          className="text-[13px] my-[5px]"
                          onClick={() => setDrop(false)}
                        >
                          {product.categoryLink}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-[14px] px-[20px] mb-[10px]">
                {t.specialEdition}
              </p>
              <p className="text-[16px] py-[5px] px-[20px] bg-yellow-400 text-black">
                {t.sale}
              </p>
            </>
          )}
        </motion.div>
      )}
    </>
  );
}
