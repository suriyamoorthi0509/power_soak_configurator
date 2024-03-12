import axios from 'axios';

 const baseURL = process.env.REACT_APP_EXTERNAL_SERVER_URL + ":5000/api/PSA";
 //const internalBaseURL = process.env.REACT_APP_CURRENT_SERVER_URL + ":5000/api/PSA";
// const baseURL = process.env.REACT_APP_EXTERNAL_SERVER_URL +":5000/api/PsautoJobs/PostPsautoJob";
 const internalBaseURL = `http://localhost:5000/api/PsautoJobs/PostPsautoJob`;

const api = axios.create({
  baseURL:internalBaseURL,
  headers: {
    "Content-type": "application/json",
  }
});

api.interceptors.request.use(
  function (config) {
    const username = sessionStorage.getItem("userEmailId");
    const isinternaluser = sessionStorage.getItem("useraud");
    if (username) {
      config.headers['useremail'] = username;
      config.headers['isinternaluser'] = isinternaluser;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response && ( error?.response?.data?.message === 'Invalid authorization token' || error?.response?.data?.message === "Missing authorization header") && window.location !== "/joiningform/") {
    //     localStorage.removeItem("useremail")
    //     localStorage.removeItem("isinternaluser");
    // }
    return Promise.reject(error);
  }
);

export default api;





