import Layout from '@/components/admin/Layout';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

const BASE_URL = 'https://jigit-shop.vercel.app/';

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

export default function NewProduct() {
  const [product, setProduct] = useState(null);

  const handleChangeSizes = (e) => {
    setProduct((prev) => {
      return { ...prev, sizes: e.target.value.split(',') };
    });
  };

  const handleChangeColors = (e) => {
    setProduct((prev) => {
      return { ...prev, colors: e.target.value.split(',') };
    });
  };

  const handleChangePrice = (e) => {
    setProduct((prev) => {
      return { ...prev, price: Number(e.target.value) };
    });
  };

  const handleChangeStock = (e) => {
    setProduct((prev) => {
      return { ...prev, countInStock: Number(e.target.value) };
    });
  };

  const handleDescriptionTwo = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImagesColorURL = (e) => {
    setProduct((prev) => {
      return { ...prev, imagesColor: e.target.value.split(',') };
    });
  };

  const handleImagesDifColorURL = (e) => {
    setProduct((prev) => {
      return { ...prev, imagesDifColor: e.target.value.split(',') };
    });
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  console.log(product);

  const createPost = async (product) => {
    try {
      await axios.post(
        `${BASE_URL}/api/admin/upload-product`,
        product
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    createPost(product);
    console.log(product);
  };

  const handleImageIntroFileUpload = async (e) => {
    const file = e.target.files[0];
    const imgIntro = await covertToBase64(file);
    setProduct((prev) => {
      return { ...prev, imgIntro };
    });
  };

  const handleImagesColorFileUpload = async (e) => {
    let files = e.target.files;
    let readers = [];

    // Abort if there were no files selected
    if (!files.length) return;

    // Store promises in array
    for (let i = 0; i < files.length; i++) {
      readers.push(covertToBase64(files[i]));
    }

    // Trigger Promises
    await Promise.all(readers).then((values) => {
      // Values will be an array that contains an item
      // with the text of every selected file
      // ["File1 Content", "File2 Content" ... "FileN Content"]
      setProduct((prev) => {
        return { ...prev, imgColor: values };
      });
    });
  };

  const handleImagesDifColorFileUpload = async (e) => {
    let files = e.target.files;
    let readers = [];

    // Abort if there were no files selected
    if (!files.length) return;

    // Store promises in array
    for (let i = 0; i < files.length; i++) {
      readers.push(covertToBase64(files[i]));
    }

    // Trigger Promises
    await Promise.all(readers).then((values) => {
      // Values will be an array that contains an item
      // with the text of every selected file
      // ["File1 Content", "File2 Content" ... "FileN Content"]
      setProduct((prev) => {
        return { ...prev, imgDifColor: values };
      });
    });
  };

  return (
    <Layout title="New Product">
      <div className="newProduct flex-[4]">
        <h1 className="addProductTitle text-2xl font-[600]">New Product</h1>
        <form
          onSubmit={handleSubmit}
          className="addProductForm mt-[5px] flex flex-wrap"
        >
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Name</label>
            <input
              className="p-[5px] border"
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              placeholder="COAT TRENCH..."
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Description One</label>
            <input
              className="p-[5px] border"
              type="text"
              name="descriptionOne"
              id="descriptionOne"
              onChange={handleChange}
              placeholder="description"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Slug</label>
            <input
              className="p-[5px] border"
              type="text"
              name="slug"
              id="slug"
              onChange={handleChange}
              placeholder="MINK | 9354/122"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Slug Extra</label>
            <input
              className="p-[5px] border"
              type="text"
              name="slug2"
              id="slug2"
              onChange={handleChange}
              placeholder="BLACK | 9324/522"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Category</label>
            <input
              className="p-[5px] border"
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              placeholder="category"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Gender</label>
            <input
              className="p-[5px] border"
              type="text"
              name="gender"
              id="gender"
              onChange={handleChange}
              placeholder="man"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Category Link</label>
            <input
              className="p-[5px] border"
              type="text"
              name="categoryLink"
              id="categoryLink"
              onChange={handleChange}
              placeholder="COATS | TRENCH COATS"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Stock</label>
            <input
              className="p-[5px] border"
              type="text"
              name="countInStock"
              id="countInStock"
              onChange={handleChangeStock}
              placeholder="stock"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Image Introduction</label>
            <input
              className="p-[5px]"
              type="file"
              name="imageIntro"
              id="imageIntro"
              accept=".jpeg, .png, .jpg, .web, .avif"
              onChange={(e) => handleImageIntroFileUpload(e)}
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Images First Color</label>
            <input
              className="p-[5px]"
              type="file"
              name="imagesColor"
              id="imagesColor"
              onChange={(e) => handleImagesColorFileUpload(e)}
              multiple
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Images Second Color</label>
            <input
              className="p-[5px]"
              type="file"
              name="imagesDifColor"
              id="imagesDifColor"
              onChange={(e) => handleImagesDifColorFileUpload(e)}
              multiple
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">
              Image Introduction By URL
            </label>
            <input
              className="p-[5px] border"
              type="text"
              name="imageIntro"
              id="imageIntroUrl"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">
              Images First Color By URL
            </label>
            <input
              className="p-[5px] border"
              type="text"
              name="imagesColor"
              id="imagesColor"
              onChange={handleImagesColorURL}
              placeholder="http:.../,http:../,etc."
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">
              Images Second Color By URL
            </label>
            <input
              className="p-[5px] border"
              type="text"
              name="imagesDifColor"
              id="imagesDifColor"
              onChange={handleImagesDifColorURL}
              placeholder="http:.../,http:../,etc."
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Price</label>
            <input
              className="p-[5px] border"
              type="text"
              name="price"
              id="price"
              onChange={handleChangePrice}
              placeholder="89.95"
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Sizes</label>
            <input
              className="p-[5px] mb-2 border"
              type="text"
              name="sizes"
              id="sizes"
              onChange={handleChangeSizes}
              placeholder="EU S / US S,EU M / US M,etc."
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Colors</label>
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="colors"
              id="colors"
              onChange={handleChangeColors}
              placeholder="#000,#fff,etc."
            />
          </div>
          <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className="font-[600] mb-[10px]">Description Two</label>
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="materialsTextOne"
              id="materialsTextOne"
              onChange={handleDescriptionTwo}
              placeholder="materials text one"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="materialsTextTwo"
              id="materialsTextTwo"
              onChange={handleDescriptionTwo}
              placeholder="materials text two"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="mainFabrick"
              id="mainFabrick"
              onChange={handleDescriptionTwo}
              placeholder="main fabrick"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="additionalMaterial"
              id="additionalMaterial"
              onChange={handleDescriptionTwo}
              placeholder="additional material"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextOne"
              id="careTextOne"
              onChange={handleDescriptionTwo}
              placeholder="careText one"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextTwo"
              id="careTextTwo"
              onChange={handleDescriptionTwo}
              placeholder="careText two"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextThree"
              id="careTextThree"
              onChange={handleDescriptionTwo}
              placeholder="careText three"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextFour"
              id="careTextFour"
              onChange={handleDescriptionTwo}
              placeholder="careText four"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextFive"
              id="careTextFive"
              onChange={handleDescriptionTwo}
              placeholder="careText five"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextSix"
              id="careTextSix"
              onChange={handleDescriptionTwo}
              placeholder="careText six"
            />
            <input
              className="p-[5px] border mb-2"
              type="text"
              name="careTextSeven"
              id="careTextSeven"
              onChange={handleDescriptionTwo}
              placeholder="careText seven"
            />
          </div>
          {/* if you want you can add active no active product */}
          {/* <div className="addProductItem p-[20px] w-[250px] flex flex-col mb-[10px]">
            <label className='font-[600] mb-[10px]'></label>
            <select className='p-[5px]' name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div> */}
          <button className="addProductButton h-max mx-auto m-[20px] mt-[5px] py-[7px] px-[20px] sm:px-28 border-none rounded-[5px] bg-blue-900 text-white cursor-pointer">
            Create
          </button>
        </form>
      </div>
    </Layout>
  );
}

function covertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
