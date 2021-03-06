import axios from 'axios';
import authHeader  from "./auth-header"

const {REACT_APP_BACKEND_URL, REACT_APP_VERSION} = process.env
const API_URL =`${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`

export class FeedService {

   
    getAllFarmers = async () => {
        const { data } = await axios.get(API_URL +`/feed/check/all`, { headers: authHeader() });
        console.log("check all data",data)
        return data
    };
}