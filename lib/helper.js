import { deleteProduct } from '@/redux/reducer';

const BASE_URL = 'https://jigit-shop.vercel.app/'

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items?.slice(startIndex, startIndex + pageSize);
};

//delete products
export const deleteProductById = async (id, dispatch) => {
  try {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    };
    await fetch(`${BASE_URL}/api/admin/delete-product`, options);
    dispatch(deleteProduct(id));
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async(data) => 
  fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => {
    if(!res.ok) throw new Error('Failed to send message');
    return res.json();
  })



export const sendContactForm = async (data) => 
  fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => {
    if(!res.ok) throw new Error('Failed to send message');
    return res.json();
  });

  export const sendEmailSignup = async (data) => 
  fetch('/api/mail-signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => {
    if(!res.ok) throw new Error('Bag request');
    return res.json();
  });
