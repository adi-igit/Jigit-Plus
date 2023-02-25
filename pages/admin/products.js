/* eslint-disable @next/next/no-img-element */
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete } from 'react-icons/ai';
import Layout from '@/components/admin/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteItem } from '@/lib/helper';
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

export default function ProductList() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/get-products');
        const data = await res.json();
        setState(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [setState, state]);

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'product',
      headerName: 'Product',
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem flex items-center">
            <img
              className="productListImg w-[32px] h-[32px] rounded-full object-cover mr-[10px]"
              src={params.row.imageIntro}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: 'countInStock',
      headerName: 'Stock',
      width: 200,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={'/admin/product/' + params.row._id}>
              <button className="productListEdit border-none rounded-[10px] py-[5px] px-[10px] bg-[#3bb077] text-white cursor-pointer mr-[20px]">
                Edit
              </button>
            </Link>

            <button onClick={() => handleDelete(params.row._id)}>
              <AiOutlineDelete
                size={25}
                className="productListDelete text-red-500 cursor-pointer"
              />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <Layout title="Products">
      <div className="productList flex-[4]">
        <DataGrid
          rows={state}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      </div>
    </Layout>
  );
}
