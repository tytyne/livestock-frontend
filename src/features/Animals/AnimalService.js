import axios from "axios";
import authHeader from "../../service/auth-header";

const { REACT_APP_BACKEND_URL, REACT_APP_VERSION } = process.env;
const API_URL = `${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`;

const getAnimalServices = async () => {
    const { data } = await axios.get(API_URL + `/animal/check/all`, { headers: authHeader() });
    console.log("check all data", data);
    return data;
};
const createAnimalServices = async (animalData) => {
    const { data } = await axios.post(API_URL + `/animal/create`, animalData, { headers: authHeader() });
    console.log("check all data", data);
    return data;
};

export default {
    getAnimalServices,
    createAnimalServices,
};
