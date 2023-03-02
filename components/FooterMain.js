import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';
import { useRouter } from 'next/router';
import React from 'react';

export default function FooterMain() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;
  return (
    <div className="my-20 flex flex-col">
      <div>
        <table>
          <tbody>
            <tr className='sm:pl-20 px-2 flex flex-wrap gap-5 sm:gap-10 text-[11px] sm:text-[13px]'>
              <td>
                <p className='font-bold py-2'>{t.help}</p>
                <p className='py-1 cursor-pointer'>{t.shopAtJIGIT}</p>
                <p className='py-1 cursor-pointer'>{t.product}</p>
                <p className='py-1 cursor-pointer'>{t.payment}</p>
                <p className='py-1 cursor-pointer'>{t.shipping}</p>
                <p className='py-1 cursor-pointer'>{t.returns}</p>
                <p className='py-1 cursor-pointer'>{t.shopAndCompany}</p>
                <p className='py-1 cursor-pointer'>{t.myAccount}</p>
              </td>
              <td>
                <p className='font-bold py-2'>{t.followUs}</p>
                <p className='py-1 cursor-pointer'>{t.newsletter}</p>
                <p className='py-1 cursor-pointer'>TIKTOK</p>
                <p className='py-1 cursor-pointer'>INSTAGRAM</p>
                <p className='py-1 cursor-pointer'>FACEBOOK</p>
                <p className='py-1 cursor-pointer'>TWITTER</p>
                <p className='py-1 cursor-pointer'>PINTEREST</p>
                <p className='py-1 cursor-pointer'>YOUTUBE</p>
              </td>
              <td>
                <p className='font-bold py-2'>{t.company}</p>
                <p className='py-1 cursor-pointer'>{t.aboutUs}</p>
                <p className='py-1 cursor-pointer'>{t.joinLife}</p>
                <p className='py-1 cursor-pointer'>{t.offices}</p>
                <p className='py-1 cursor-pointer'>{t.workWithUs}</p>
                <p className='py-1 cursor-pointer'>{t.contact}</p>
                <p className='py-1 cursor-pointer'>{t.legalNotes}</p>
              </td>
              <td className='justify-self-start'>
                <p className='font-bold py-2'>{t.policies}</p>
                <p className='py-1 cursor-pointer'>{t.privacyPolicy}</p>
                <p className='py-1 cursor-pointer'>{t.purchaseConditions}</p>
                <p className='py-1 cursor-pointer'>{t.cookiesSettings}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-[100px] px-2 sm:px-0 flex flex-wrap justify-between text-[13px]'>
        <p className='sm:ml-20'>{t.international}</p>
        <div className='flex gap-5 mr-5'>
          <p className='uppercase'>{locale} |</p>
          <p>{t.copyrightFooterMain}</p>
        </div>
      </div>
    </div>
  );
}
