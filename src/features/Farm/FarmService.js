import axios from "axios";
import authHeader from "../../service/auth-header";

const { REACT_APP_BACKEND_URL, REACT_APP_VERSION } = process.env;
const API_URL = `${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}/farm`;

const getAllFarms = async () => {
    const { data } = await axios.get(`${API_URL}/check/all`, { headers: authHeader() });
    return data;
};

const createFarm = async (farmData) => {
    const { data } = await axios.post(`${API_URL}/create`, farmData, { headers: authHeader() });
    return data;
};
export default {
    createFarm,
    getAllFarms,
};
