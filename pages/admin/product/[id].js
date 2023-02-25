/* eslint-disable @next/next/no-img-element */
import Chart from '@/components/admin/Chart';
import { productData } from '@/utils/dummyData';
import { MdPublish } from 'react-icons/md';
import Link from 'next/link';
import Layout from '@/components/admin/Layout';
import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';


export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });

  if (!session && session === 'jigitreply@gmail.com') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const client = await clientPromise;
  const db = client.db('shop-db');
  const id = new ObjectId(params.id);
  const product = await db.collection('products').findOne({ _id: id });
  return {
    props: { product: JSON.parse(JSON.stringify(product)), session },
  };
}

export default function Product({ product }) {
  return (
    <Layout title="Product">
      <div className="product flex-[4] p-[20px]">
        <div className="productTitleContainer flex items-center justify-between">
          <h1 className="productTitle text-2xl font-[600]">Product</h1>
          <Link href="/admin/new-product">
            <button className="productAddButton w-[80px] border-none p-[5px] bg-teal-500 text-white rounded-[5px] text-[16px] cursor-pointer">
              Create
            </button>
          </Link>
        </div>
        <div className="productTop flex">
          <div className="productTopLeft flex-[1]">
            <Chart
              data={productData}
              dataKey="Sales"
              title="Sales Performance"
            />
          </div>
          <div className="productTopRight flex-[1] p-[20px] m-[20px]">
            <div className="productInfoTop flex items-center">
              <img
                src={product.imageIntro}
                alt=""
                className="productInfoImg w-[40px] h-[40px] rounded-full object-cover mr-[20px]"
              />
              <span className="productName">{product.name}</span>
            </div>
            <div className="productInfoBottom mt-[10px]">
              <div className="productInfoItem w-[250px] flex justify-between">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue font-[300]">{`${product._id.substring(
                  0,
                  5
                )}...`}</span>
              </div>
              <div className="productInfoItem w-[250px] flex justify-between">
                <span className="productInfoKey">stock:</span>
                <span className="productInfoValue font-[300]">
                  {product.countInStock}
                </span>
              </div>
              <div className="productInfoItem w-[250px] flex justify-between">
                <span className="productInfoKey">active:</span>
                <span className="productInfoValue font-[300]">yes</span>
              </div>
              <div className="productInfoItem w-[250px] flex justify-between">
                <span className="productInfoKey">slug:</span>
                <span className="productInfoValue font-[300]">
                  {product.slug}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom p-[20px] m-[20px]">
          <form className="productForm flex justify-between">
            <div className="productFormLeft flex flex-col">
              <label className="mb-[10px] text-gray-300">Product Name</label>
              <input
                className="mb-[10px] border-none p-[5px] border-b border-b-gray-300"
                type="text"
                placeholder="Apple AirPod"
              />
              <label className="mb-[10px] text-gray-300">In Stock</label>
              <select className="mb-[10px]" name="inStock" id="idStock">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label className="mb-[10px] text-gray-300">Active</label>
              <select className="mb-[10px]" name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="productFormRight flex flex-col justify-around">
              <div className="productUpload flex items-center">
                <img
                  src={product.imagesColor[4]}
                  alt=""
                  className="productUploadImg w-[100px] h-[100px] rounded-[10px] object-cover mr-[20px]"
                />
                <label for="file">
                  <MdPublish size={25} />
                </label>
                <input type="file" id="file" style={{ display: 'none' }} />
              </div>
              <button className="productButton border-none p-[5px] rounded-[5px] bg-blue-900 text-white font-[600] cursor-pointer">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
