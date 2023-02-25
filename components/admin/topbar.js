/* eslint-disable @next/next/no-img-element */
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdLanguage } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';

export default function Topbar() {
  return (
    <div className="topbar sticky top-0 w-full h-[50px] bg-white z-[999]">
      <div className="topbarWrapper h-full py-0 px-[20px] flex justify-between items-center">
        <div className="topLeft">
          <span className="logo font-bold text-[32px] text-blue-900">
            Management
          </span>
        </div>
        <div className="topRight flex items-center">
          <div className="topbarIconContainer cursor-pointer mr-[10px] text-[#555] relative">
            <IoMdNotificationsOutline size={25} />
            <span className='topIconBadge flex items-center justify-center text-[10px] w-[15px] absolute top-[-5px] right-0 bg-red-500 text-white rounded-full'>2</span>
          </div>
          <div className="topbarIconContainer cursor-pointer mr-[10px] text-[#555] relative">
            <MdLanguage size={25} />
            <span className='topIconBadge flex items-center justify-center text-[10px] w-[15px] absolute top-[-5px] right-[5px] bg-red-500 text-white rounded-full'>2</span>
          </div>
          <div className="topbarIconContainer cursor-pointer mr-[10px] text-[#555] relative">
            <IoIosSettings size={25} />
          </div>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU' alt='' className='topAvatar w-[40px] h-[40px] rounded-full cursor-pointer' />
        </div>
      </div>
    </div>
  );
}
