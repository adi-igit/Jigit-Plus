import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import { useRouter } from 'next/router';
import React from 'react'

export default function FooterSlider() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  return (
    <div className='w-full h-full flex flex-col justify-around items-center font-[300]'>
      <div>{t.joinNewsletter}</div>
      <div className='flex flex-col sm:flex-row gap-[30px] text-[14px]'>
        <p>TIKTOK</p>
        <p>INSTAGRAM</p>
        <p>FACEBOOK</p>
        <p>TWIITER</p>
        <p>YOUTUBE</p>
        <p>PINTEREST</p>
        <p>SPOTIFY</p>
      </div>
      <div>{t.copyright}</div>
    </div>
  )
}
