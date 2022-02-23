import{RETREIVE_FARMERS,CREATE_FARMER}from "./types"
import {FarmerService} from "../service/FarmerService"

export const retreiveFarmers=()=>async(dispatch)=>{

    try{
        const farmerService = new FarmerService();
        const res= await farmerService.getAllFarmers()
    dispatch(
        {
            type:RETREIVE_FARMERS,
            payload:res.data.data
        }
    )

    }
    catch(err){
        console.log(err)
    }
    

}

export const createFarming=(firstname,lastname,phone,nid,gender,farmer_cat,province,district,cell,sector,village)=>async(dispatch)=>{
    
    try{
        const farmerService = new FarmerService();
        const res = await farmerService.createFarmer({firstname,lastname,phone,nid,gender,farmer_cat,province,district,cell,sector,village})
        dispatch({
            type:CREATE_FARMER,
            payload:res.data
        });
        return Promise.resolve(res.data);
    

    }
    catch(err){
        return Promise.reject(err)
    }
    


}