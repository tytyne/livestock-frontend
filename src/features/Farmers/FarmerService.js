import axios from "axios";
import authHeader from "../../service/auth-header";

const { REACT_APP_BACKEND_URL, REACT_APP_VERSION } = process.env;
const API_URL = `${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`;

const getAllFarmers = async () => {
    const { data } = await axios.get(API_URL + `/farmer/check/all`, { headers: authHeader() });
    return data;
};
const createFarmer = async (farmerData) => {
    const { data } = await axios.post(API_URL + `/farmer/create`, farmerData, { headers: authHeader() });
    return data;
};

const deleteFarmer = async (id) => {
    const { data } = await axios.delete(API_URL + `/farmer/${id}`, { headers: authHeader() });
    return data;
};

const updateFarmer = async (id, farmerData) => {
    const { data } = await axios.put(API_URL + `/farmer/${id}`, farmerData, { headers: authHeader() });
    return data;
};

export default {
    getAllFarmers,
    createFarmer,
    deleteFarmer,
    updateFarmer,
};
