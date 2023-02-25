import Layout from '@/components/admin/Layout'
import { getSession } from 'next-auth/react';
import React from 'react'

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

export default function NewUser() {
  return (
    <Layout title='New User'>
       <div className="newUser flex-[4]">
      <h1 className="newUserTitle text-2xl font-[600] mb-4">New User</h1>
      <form className="newUserForm flex flex-wrap">
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='text-[14px] font-[600] text-[rgba(151,150,150)]'>Username</label>
          <input type="text" className='mt-[5px] mb-[15px] p-[5px] border' placeholder="john" />
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='text-[14px] font-[600] text-[rgba(151,150,150)]'>Full Name</label>
          <input type="text" className='mt-[5px] mb-[15px] p-[5px] border' placeholder="John Smith" />
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='text-[14px] font-[600] text-[rgba(151,150,150)]'>Email</label>
          <input type="email" className='mt-[5px] mb-[15px] p-[5px] border' placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='text-[14px] font-[600] text-[rgba(151,150,150)]'>Password</label>
          <input type="password" className='mt-[5px] mb-[15px] p-[5px] border' placeholder="password" />
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='text-[14px] font-[600] text-[rgba(151,150,150)]'>Phone</label>
          <input type="text" className='mt-[5px] mb-[15px] p-[5px] border' placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='text-[14px] font-[600] text-[rgba(151,150,150)]'>Address</label>
          <input type="text" className='mt-[5px] mb-[15px] p-[5px] border' placeholder="New York | USA" />
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='mb-[10px] text-[14px] font-[600] text-[rgba(151,150,150)]'>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label className='m-[10px] text-[18px] text-[#555]' for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label className='m-[10px] text-[18px] text-[#555]' for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label className='m-[10px] text-[18px] text-[#555]' for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem w-[400px] flex flex-col mt-[10px] mr-[20px]">
          <label className='mb-[10px] text-[14px] font-[600] text-[rgba(151,150,150)]'>Active</label>
          <select className="newUserSelect h-[40px] rounded-[5px]" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton w-[200px] border-none bg-blue-900 text-white py-[7px] px-[10px] font-[600] rounded-[10px] mt-[30px] cursor-pointer">Create</button>
      </form>
    </div>
    </Layout>
  )
}
