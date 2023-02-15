import Navbar from '@/components/Navbar'
import Head from 'next/head'
import React from 'react'

export default function Search() {
  return (
    <>
      <Head>
        <title>Search - JIGIT</title>
        <meta name="description" content="Search - JIGIT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className='pt-[100px]'>
        <div className='flex gap-[15px] text-[14px] mx-5'>
          <p>MAN</p>
          <p>WOMAN</p>
          <p>KIDS</p>
        </div>
        <div>
          <input placeholder='SEARCH FOR AN ITEM, COLOUR, COLLECTION' className='w-[90%] my-5 mx-2 p-2 text-[14px] border-b-[1px] border-b-black outline-none'/>
        </div>
      </div>
    </>
  )
}
