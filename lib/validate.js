export default function login_validate(values) {
  const errors = {};

  //validation for email
  if (!values.email) {
    errors.email = 'Required...';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address...';
  }

  //validation for password
  if (!values.password) {
    errors.password = ' Required...';
  } else if (values.password.length < 5 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less 20 characters long...';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password...';
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.includes(' ')) {
    errors.username = 'Invalid Username...!';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = ' Required';
  } else if (values.password.length < 5 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less 20 characters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  //validate confirm password
  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Password Not Match...!';
  } else if (values.cpassword.includes(' ')) {
    errors.cpassword = 'Invalid Confirm Password';
  }

  return errors;
}

export function shippingAddressValidate(values) {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  if (!values.address) {
    errors.address = 'Required';
  } else if (values.address.length < 2) {
    errors.address = 'Address is more than 2 chars';
  }

  if (!values.city) {
    errors.city = 'Required';
  } else if (values.city.length < 2) {
    errors.address = 'City is more than 2 chars';
  }

  if (!values.postalCode) {
    errors.postalCode = 'Required';
  } else if (values.postalCode.length < 2) {
    errors.postalCode = 'City is more than 2 chars';
  }

  if (!values.country) {
    errors.country = 'Required';
  } else if (values.country.length < 2) {
    errors.country = 'City is more than 2 chars';
  }

  return errors;
}

export function updateProfileValidate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 2) {
    errors.name = 'Name is more than 2 chars';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = ' Required';
  } else if (values.password.length < 5 || values.password.length > 20) {
    errors.password = 'Must be greater then 8 and less 20 characters long';
  } else if (values.password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  //validate confirm password
  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Password Not Match...!';
  } else if (values.cpassword.includes(' ')) {
    errors.cpassword = 'Invalid Confirm Password';
  }

  return errors;
}

export function contactForm(values){
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 1) {
    errors.name = 'Name is more than 1 chars';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.subject) {
    errors.subject = 'Required';
  } else if (values.subject.length < 2) {
    errors.subject = 'Subject is more than 2 chars';
  }

  if(!values.message) {
    errors.message = 'Required'
  } else if (values.message.length < 10) {
    errors.message = 'Message is more than 10 chars'
  }

  return errors;
}