/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { SlCalender } from 'react-icons/sl'
import { MdLocationSearching } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { MdPermIdentity } from 'react-icons/md'
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import { MdPublish } from 'react-icons/md'
import Layout from '@/components/admin/Layout';
import { getSession } from 'next-auth/react'

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session && session === 'jigitreply@gmail.com') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // authorize user return session
  return {
    props: { session },
  };
}

export default function User() {
  return (
    <Layout title='User'>
    <div className="user flex-[4] p-[20px]">
      <div className="userTitleContainer flex items-center justify-between">
        <h1 className="userTitle">Edit User</h1>
        <Link href="/admin/new-user">
          <button className="userAddButton w-[80px] border-none p-[5px] bg-teal-500 rounded-[5px] cursor-pointer text-white text-[16px]">Create</button>
        </Link>
      </div>
      <div className="userContainer flex mt-[20px]">
        <div className="userShow flex-[1] p-[20px]">
          <div className="userShowTop flex items-center">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="userShowTopTitle flex flex-col ml-[20px]">
              <span className="userShowUsername font-[600]">Anna Becker</span>
              <span className="userShowUserTitle font-[300]">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom mt-[20px]">
            <span className="userShowTitle text-[14px] font-[600] text-[rgba(175,170,170)]">Account Details</span>
            <div className="userShowInfo flex items-center my-[20px] text-[#444]">
              <MdPermIdentity className="userShowIcon text-[16px]" />
              <span className="userShowInfoTitle ml-[10px]">annabeck99</span>
            </div>
            <div className="userShowInfo flex items-center my-[20px] text-[#444]">
              <SlCalender className="userShowIcon text-[16px]" />
              <span className="userShowInfoTitle ml-[10px]">10.12.1999</span>
            </div>
            <span className="userShowTitle text-[14px] font-[600] text-[rgba(175,170,170)]">Contact Details</span>
            <div className="userShowInfo flex items-center my-[20px] text-[#444]">
              <MdOutlinePhoneAndroid className="userShowIcon text-[16px]" />
              <span className="userShowInfoTitle ml-[10px]">+1 123 456 67</span>
            </div>
            <div className="userShowInfo flex items-center my-[20px] text-[#444]">
              <AiOutlineMail className="userShowIcon text-[16px]" />
              <span className="userShowInfoTitle ml-[10px]">annabeck99@gmail.com</span>
            </div>
            <div className="userShowInfo flex items-center my-[20px] text-[#444]">
              <MdLocationSearching className="userShowIcon text-[16px]" />
              <span className="userShowInfoTitle ml-[10px]">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate flex-[2] p-[20px] ml-[20px]">
          <span className="userUpdateTitle text-[24px] font-[600]">Edit</span>
          <form className="userUpdateForm flex justify-between mt-[20px]">
            <div className="userUpdateLeft">
              <div className="userUpdateItem flex flex-col mt-[10px]">
                <label className='mb-[5px] text-[14px]'>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput border-none w-[250px] h-[30px] border-b border-b-gray-300"
                />
              </div>
              <div className="userUpdateItem flex flex-col mt-[10px]">
                <label className='mb-[5px] text-[14px]'>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput border-none w-[250px] h-[30px] border-b border-b-gray-300"
                />
              </div>
              <div className="userUpdateItem flex flex-col mt-[10px]">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput border-none w-[250px] h-[30px] border-b border-b-gray-300"
                />
              </div>
              <div className="userUpdateItem flex flex-col mt-[10px]">
                <label className='mb-[5px] text-[14px]'>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput border-none w-[250px] h-[30px] border-b border-b-gray-300"
                />
              </div>
              <div className="userUpdateItem flex flex-col mt-[10px]">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput border-none w-[250px] h-[30px] border-b border-b-gray-300"
                />
              </div>
            </div>
            <div className="userUpdateRight flex flex-col justify-between">
              <div className="userUpdateUpload flex items-center">
                <img
                  className="userUpdateImg w-[100px] h-[100px] rounded-[10px] object-cover mr-[20px]"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <MdPublish className="userUpdateIcon cursor-pointer" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton rounded-[5px] border-none p-[5px] cursor-pointer bg-blue-900 text-white font-[600]">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
}