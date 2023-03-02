import Head from 'next/head';
import Navbar from '../components/Navbar';
import Slider from '@/components/Slider';
import { useRouter } from 'next/router';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <>
      <Head>
        <title>{t.headMainPage} - JIGIT</title>
        <meta name="description" content={`${t.headMainPage} - JIGIT`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full relative">
        <Navbar locale={locale} />
        <Slider />
      </main>
    </>
  );
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslation(locale, ['about'])),
//       // will be passed to the page component as props
//     },
//   };
// }
