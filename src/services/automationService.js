import api from './api';

const getPSAJobIDList = async (data) => {
  return await api.post('/GetPSAJobIDList', data);
};

const getCustomerReferenceData = async(intertaluser) => {
    return await api.get(`/GetCustomerReferenceData?isinternaluser=${intertaluser}`);
}

const getFilterData = async() => {
    return await api.get(`/GetFilterData`);
}



export { getPSAJobIDList, getCustomerReferenceData, getFilterData };