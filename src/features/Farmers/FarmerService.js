import axios from "axios";
import authHeader from "../../service/auth-header";

const { REACT_APP_BACKEND_URL, REACT_APP_VERSION } = process.env;
const API_URL = `${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`;

const getAllFarmers = async () => {
    const { data } = await axios.get(API_URL + `/farmer/check/all`, { headers: authHeader() });
    console.log("check all data", data);
    return data;
};
const createFarmer = async (farmerData) => {
    const { data } = await axios.post(API_URL + `/farmer/create`, farmerData, { headers: authHeader() });

    console.log("check create data", data);
    return data;
};

export default {
    getAllFarmers,
    createFarmer,
};
