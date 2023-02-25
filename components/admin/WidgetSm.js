/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { MdVisibility } from 'react-icons/md';

export default function WidgetSm() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const res = await fetch('/api/admin/get-users')
        const data = await res.json();
        setUsers(data);
      }catch(err){
        console.log(err)
      }
    }

    fetchUsers();
  }, [])

  console.log(users)

  return (
    <div className="widgetSm flex-[1] p-[20px] mb-4 mr-[20px]">
      <span className="widgetSmTitle text-[32px] font-[600]">
        New Join Members
      </span>
      <ul className="widgetSmList">
        {users?.map((user) => (
          <li
            key={user._id}
            className="widgetSmListItem flex items-center justify-between my-[20px]"
          >
            <img
              src={
                user.profilePic || 'https://cdn-icons-png.flaticon.com/512/229/229256.png?w=740&t=st=1677121355~exp=1677121955~hmac=45610964d2b61471bf98e51782dff443033467e3ada4ff3877ca711e91220990'
              }
              alt=""
              className="widgetSmImg w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="widgetSmUser flex flex-col">
              <span className="widgetSmUsername font-[600]">{user.username}</span>
            </div>
            <button className="widgetSmButton flex items-center border-none rounded-[10px] py-[7px] px-[10px] bg-[#eeeef7] text-[#555] cursor-pointer">
              <MdVisibility className="widgetSmIcon text-[12px] mr-[5px]" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
