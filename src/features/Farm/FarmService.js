import axios from "axios";
import authHeader from "../../service/auth-header";

const { REACT_APP_BACKEND_URL, REACT_APP_VERSION } = process.env;
const API_URL = `${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`;

const getAllFarms = async () => {};

const createFarm = async (farmData) => {
    const { data } = await axios.post(`${API_URL}/farm/create`, farmData, { headers: authHeader() });
};
export default {
    createFarm,
};
