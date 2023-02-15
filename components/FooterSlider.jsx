import React from 'react'

export default function FooterSlider() {
  return (
    <div className='w-full h-full flex flex-col justify-around items-center font-[300]'>
      <div>JOIN OUR NEWSLETTER</div>
      <div className='flex flex-col sm:flex-row gap-[30px] text-[14px]'>
        <p>TIKTOK</p>
        <p>INSTAGRAM</p>
        <p>FACEBOOK</p>
        <p>TWIITER</p>
        <p>YOUTUBE</p>
        <p>PINTEREST</p>
        <p>SPOTIFY</p>
      </div>
      <div>© All Rights are reserved by JIGIT+</div>
    </div>
  )
}
