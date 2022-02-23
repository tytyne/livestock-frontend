import axios from 'axios';
import authHeader  from "./auth-header"

const {REACT_APP_BACKEND_URL, REACT_APP_VERSION} = process.env
const API_URL =`${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`

export class FarmerService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getFarmers() {
        return axios.get('assets/demo/data/farmers.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
    getAllFarmers = async () => {
        const { data } = await axios.get(API_URL +`/farmer/check/all`, { headers: authHeader() });
        console.log("check all data",data)
        return data
    };
    createFarmer = async(firstname,lastname,phone,nid,gender,farmer_cat,province,district,cell,sector,village)=>{
        console.log(firstname)
        const { data } = await axios.post(API_URL +`/farmer/create`,{firstname,lastname,phone,nid,gender,farmer_cat,province,district,cell,sector,village},{ headers: authHeader() });
        console.log(firstname)
        console.log("check create data",data)
        return data
    }
}