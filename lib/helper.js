import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items?.slice(startIndex, startIndex + pageSize);
};




// //get products

// export const getProduct = async () => {
//   const response = await fetch('http://localhost:3000/api/products');
//   const json = await response.json();

//   return json;
// };

// // get related products
// export const getRelatedProduct = async (category) => {
//   const response = await fetch(
//     `http://localhost:3000/api/category/${category}`
//   );
//   const json = await response.json();

//   return json;
// };

// //get a product by id
// export const getProductById = async (productId) => {
//   const response = await fetch(
//     `http://localhost:3000/api/products/${productId}`
//   );
//   const json = await response.json();

//   return json;
// };



// //getP-s
// export const getProducts = async () => {
//   const res = await fetch('http://localhost:3000/api/clothes');
//   const data = res.json();

//   return data;
// };
