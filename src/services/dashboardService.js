// import api from './api';
import { useState,useEffect } from 'react';
import axios from 'axios';

// const getPSAJobList = async (data) => {
//   return await axios.get(`http://localhost:5000/api/PsautoJobs/GetUserPsautoJobs/${data}`);
//   export const RecptionProfileUpdate= (ReceptionProfileUser)=> axios.put(`${PROFILE_API_URL}/ReceptionProfileUpdate`,ReceptionProfileUser);
//    /api/PsautoJobs/GetUserPsautoJobs/{userMailID}
//   return await api.post('/GetPSAJobList', data);
// };



// export { getPSAJobList };
export  const getalluser =(user)=> axios.get(`http://localhost:5000/api/PsautoJobs/GetAllUsersPsautoJobs`,user);
export const getTokenId =()=>{


}


