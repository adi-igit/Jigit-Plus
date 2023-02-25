import Head from 'next/head'
import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './topbar'

export default function Layout({children, title}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
    <Topbar />
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  </div>
  )
}
