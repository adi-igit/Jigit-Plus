import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function FeaturedInfo() {
  return (
    <div className='featured w-full h-max flex justify-between'>
      <div className="featuredItem flex-[1] mx-[20px] p-[30px] rounded-[10px] cursor-pointer border border-blue-300 hover:opacity-[1.02] duration-200 hover:border-green-300">
        <span className="featuredTitle text-[20px]">Revenue</span>
        <div className="featuredMoneyContainer my-[10px] flex items-center">
          <span className="featuredMoney text-[30px] font-[600]">$2,415</span>
          <span className="featuredMoneyRate flex items-center ml-[20px]">
            -11.4 <AiOutlineArrowDown className='featuredIcon negative text-red-500' />
          </span>
        </div>
        <span className="featuredSub text-[15px] text-gray-300">Compared to last month</span>
      </div>
      <div className="featuredItem flex-[1] mx-[20px] p-[30px] rounded-[10px] cursor-pointer border border-blue-300 hover:opacity-[1.02] duration-200 hover:border-green-300">
        <span className="featuredTitle text-[20px]">Sales</span>
        <div className="featuredMoneyContainer my-[10px] flex items-center">
          <span className="featuredMoney text-[30px] font-[600]">$4,415</span>
          <span className="featuredMoneyRate flex items-center ml-[20px]">
            -1.4 <AiOutlineArrowDown className='featuredIcon negative text-red-500' />
          </span>
        </div>
        <span className="featuredSub text-[15px] text-gray-300">Compared to last month</span>
      </div>
      <div className="featuredItem flex-[1] mx-[20px] p-[30px] rounded-[10px] cursor-pointer border border-blue-300 hover:opacity-[1.02] duration-200 hover:border-green-300">
        <span className="featuredTitle text-[20px]">Costs</span>
        <div className="featuredMoneyContainer my-[10px] flex items-center">
          <span className="featuredMoney text-[30px] font-[600]">$2,225</span>
          <span className="featuredMoneyRate flex items-center ml-[20px]">
            +2.4 <AiOutlineArrowUp className='featuredIcon text-red-500' />
          </span>
        </div>
        <span className="featuredSub text-[15px] text-gray-300">Compared to last month</span>
      </div>
    </div>
  )
}