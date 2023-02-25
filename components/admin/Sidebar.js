import React, { useState } from 'react';
import { MdLineStyle, MdTimeline } from 'react-icons/md';
import { BiDollar, BiStore, BiTrendingUp } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { TbReportSearch } from 'react-icons/tb';
import Link from 'next/link';

export default function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <div className="sidebar sticky top-[50px] flex-[1] h-[calc(100vh-50px)]">
      <div className="sidebarWrapper p-[20px] text-[#555]">
        <div className="sidebarMenu mb-[10px]">
          <h3 className="sidebarTitle text-[14px] text-gray-400">Dashboard</h3>
          <ul className="sidebarList p-[5px]">
            <Link href="/admin">
              <li
                onClick={() => setActive(1)}
                className={`sidebarListItem flex gap-1 items-center p-[5px] cursor-pointer rounded-[10px] ${
                  active === 1 && 'bg-gray-100'
                }`}
              >
                <MdLineStyle
                  size={25}
                  className="sidebarIcon mr-[5px] text-[20px]"
                />
                <p>Home</p>
              </li>
            </Link>
            <li
              onClick={() => setActive(2)}
              className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 2 && 'bg-gray-100'
              }`}
            >
              <MdTimeline size={25} className="sidebarIcon " />
              <p>Analytics</p>
            </li>
            <li
              onClick={() => setActive(3)}
              className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 3 && 'bg-gray-100'
              }`}
            >
              <BiTrendingUp size={25} className="sidebarIcon " />
              <p>Sales</p>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu mb-[10px]">
          <h3 className="sidebarTitle text-[14px] text-gray-400">Quick Menu</h3>
          <ul className="sidebarList p-[5px]">
            <Link href="/admin/users">
              <li
                onClick={() => setActive(4)}
                className={`sidebarListItem flex gap-1 items-center p-[5px] cursor-pointer rounded-[10px] ${
                  active === 4 && 'bg-gray-100'
                }`}
              >
                <FiUsers
                  size={25}
                  className="sidebarIcon mr-[5px] text-[20px]"
                />
                <p>Users</p>
              </li>
            </Link>
            <Link href="/admin/products">
              <li
                onClick={() => setActive(5)}
                className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                  active === 5 && 'bg-gray-100'
                }`}
              >
                <BiStore size={25} className="sidebarIcon " />
                <p>Products</p>
              </li>
            </Link>
            <li
              onClick={() => setActive(6)}
              className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 6 && 'bg-gray-100'
              }`}
            >
              <BiDollar size={25} className="sidebarIcon " />
              <p>Transactions</p>
            </li>
            <li
              onClick={() => setActive(6)}
              className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 6 && 'bg-gray-100'
              }`}
            >
              <TbReportSearch size={25} className="sidebarIcon " />
              <p>Reports</p>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu mb-[10px]">
          <h3 className="sidebarTitle text-[14px] text-gray-400">
            Notifications
          </h3>
          <ul className="sidebarList p-[5px]">
            <li
              onClick={() => setActive(7)}
              className={`sidebarListItem flex gap-1 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 7 && 'bg-gray-100'
              }`}
            >
              <MdLineStyle
                size={25}
                className="sidebarIcon mr-[5px] text-[20px]"
              />
              <p>Home</p>
            </li>
            <li
              onClick={() => setActive(8)}
              className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 8 && 'bg-gray-100'
              }`}
            >
              <MdTimeline size={25} className="sidebarIcon " />
              <p>Analytics</p>
            </li>
            <li
              onClick={() => setActive(9)}
              className={`sidebarListItem flex gap-2 items-center p-[5px] cursor-pointer rounded-[10px] ${
                active === 9 && 'bg-gray-100'
              }`}
            >
              <BiTrendingUp size={25} className="sidebarIcon " />
              <p>Sales</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
