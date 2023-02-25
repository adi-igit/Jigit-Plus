import Chart from '@/components/admin/Chart'
import FeaturedInfo from '@/components/admin/FeaturedInfo'
import React from 'react'
import { userData } from '@/utils/dummyData' 
import WidgetSm from '@/components/admin/WidgetSm'
import WidgetLg from '@/components/admin/WidgetLg'

export default function Home() {
  return (
    <div className='flex-[4]'>
      <FeaturedInfo />
      <Chart data={userData} title='User Analytics' grid dataKey='Active User' />
      <div className='homeWidgets flex p-[20px]'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}
