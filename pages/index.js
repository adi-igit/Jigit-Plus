import Head from 'next/head';
import Navbar from '../components/Navbar';
import Slider from '@/components/Slider';

export default function Home() {

  return (
    <>
      <Head>
        <title>Home Page - JIGIT</title>
        <meta name="description" content="Home Page - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full h-full relative'>
        <Navbar />
        <Slider />
      </main>
    </>
  );
}
