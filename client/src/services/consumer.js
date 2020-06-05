import axios from 'axios';

const loginCall = async (userId, password) => {
  let res = await axios({
    method: 'post',
    url: 'http://localhost:3005/consumer/login',
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
    url: 'http://localhost:3005/consumer/logout',
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
    url: 'http://localhost:3005/consumer/signup',
    data: {
      emailId: bodyData.emailId,
      firstName: bodyData.firstName,
      lastName: bodyData.lastName,
      mobileNumber: bodyData.mobile,
      password: bodyData.password
    },
    headers: { 'Content-Type': 'application/json' }
  })
    .then((result) => result.data)
    .catch(e => {
      throw new Error(e.response.data.message);
    });
  return res;
}


export { loginCall, logout, signupService };