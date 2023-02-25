/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/admin/Layout';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete } from 'react-icons/ai';
import { userRows } from '@/utils/dummyData'; 
import { useState } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

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

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'user',
      headerName: 'Username',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser flex items-center">
            <img className="userListImg w-[32px] h-[32px] rounded-full object-cover mr-[10px]" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'transaction',
      headerName: 'Transaction Volume',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={'/admin/user/' + params.row.id}>
              <button className="userListEdit border-none rounded-[10px] py-[5px] px-[10px] bg-[#3bb077] text-white cursor-pointer mr-[20px]">Edit</button>
            </Link>
            <AiOutlineDelete
              className="userListDelete text-red-500 cursor-pointer text-[20px]"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Layout title="Users">
      <div className="flex-[4]">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Layout>
  );
}
