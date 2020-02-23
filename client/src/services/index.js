import axios from 'axios';

const getAllProducts = async () => {
  let res = await axios.get('http://localhost:3005/products/all')
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

const loginCall = async (userId, password) => {
  let res = await axios({
    method: 'post',
    url: 'http://localhost:3005/authService/users/login',
    data: {
      emailId: userId,
      password: password
    },
    headers: { 'Content-Type': 'application/json' }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

const logout = async (token) => {
  let res = await axios({
    method: 'get',
    url: 'http://localhost:3005/authService/users/logout',
    headers: { 'x-access-token': token }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

const signupService = async (bodyData) => {
  let res = await axios({
    method: 'post',
    url: 'http://localhost:3005/authService/users/signup',
    data: {
      emailId: bodyData.signupId,
      firstName: bodyData.firstName,
      lastName: bodyData.lastName,
      location: bodyData.location,
      mobileNumber: bodyData.mobile,
      password: bodyData.signupPassword
    },
    headers: { 'Content-Type': 'application/json' }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

const addProduct = async (bodyData) => {
  let res = await axios({
    method: 'post',
    url: 'http://localhost:3005/products/add',
    data: {
      productName: bodyData.productName,
      description: bodyData.description,
      gender: bodyData.gender,
      category: bodyData.category,
      sleeveType: bodyData.sleeveType,
      neckType: bodyData.neckType,
      manufacturer: bodyData.manufacturer,
      price: bodyData.price,
      quantity: bodyData.quantity,
      image1: bodyData.image1,
      image2: bodyData.image2,
      image3: bodyData.image3,
      image4: bodyData.image4,
      image5: bodyData.image5
    },
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
  }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

const getViews = async () => {
  let res = await axios({
    method: 'get',
    url: 'http://localhost:3005/products/views',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
  }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

const getProductDetails = async (id) => {
  let res = await axios({
    method: 'get',
    url: `http://localhost:3005/products/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem('token')
  }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}

export { getAllProducts, loginCall, logout, signupService, addProduct,getViews,getProductDetails };

// async function register(user) {
//     const res= await axios.post(config.registerUrl, user)
//     .then(res=>{
//         return res.data
//       })
//     .catch(e=>{
//       throw new Error(e.response.data.message);
//     });
//     return res;

//   }