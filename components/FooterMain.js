import React from 'react';

export default function FooterMain() {
  return (
    <div className="my-20 flex flex-col">
      <div>
        <table>
          <tbody>
            <tr className='sm:pl-20 px-2 flex flex-wrap gap-5 sm:gap-10 text-[11px] sm:text-[13px]'>
              <td>
                <p className='font-bold py-2'>HELP</p>
                <p className='py-1 cursor-pointer'>SHOP AT JIGIT+</p>
                <p className='py-1 cursor-pointer'>PRODUCT</p>
                <p className='py-1 cursor-pointer'>PAYMENT</p>
                <p className='py-1 cursor-pointer'>SHIPPING</p>
                <p className='py-1 cursor-pointer'>RETURNS</p>
                <p className='py-1 cursor-pointer'>SHOPS AND COMPANY</p>
                <p className='py-1 cursor-pointer'>MY ACCOUNT</p>
              </td>
              <td>
                <p className='font-bold py-2'>FOLLOW US</p>
                <p className='py-1 cursor-pointer'>NEWSLETTER</p>
                <p className='py-1 cursor-pointer'>TIKTOK</p>
                <p className='py-1 cursor-pointer'>INSTAGRAM</p>
                <p className='py-1 cursor-pointer'>FACEBOOK</p>
                <p className='py-1 cursor-pointer'>TWITTER</p>
                <p className='py-1 cursor-pointer'>PINTEREST</p>
                <p className='py-1 cursor-pointer'>YOUTUBE</p>
              </td>
              <td>
                <p className='font-bold py-2'>COMPANY</p>
                <p className='py-1 cursor-pointer'>ABOUT US</p>
                <p className='py-1 cursor-pointer'>JOIN LIFE</p>
                <p className='py-1 cursor-pointer'>OFFICES</p>
                <p className='py-1 cursor-pointer'>WORK WITH US</p>
                <p className='py-1 cursor-pointer'>CONTACT</p>
                <p className='py-1 cursor-pointer'>LEGAL NOTES</p>
              </td>
              <td className='justify-self-start'>
                <p className='font-bold py-2'>POLICIES</p>
                <p className='py-1 cursor-pointer'>PRIVACY POLICY</p>
                <p className='py-1 cursor-pointer'>PURCHASE CONDITIONS</p>
                <p className='py-1 cursor-pointer'>COOKIES SETTINGS</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-[100px] px-2 sm:px-0 flex flex-wrap justify-between text-[13px]'>
        <p className='sm:ml-20'>INTERNATIONAL</p>
        <div className='flex gap-5 mr-5'>
          <p>ENGLISH |</p>
          <p>© ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
}
