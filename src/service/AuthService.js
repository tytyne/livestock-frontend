import axios from "axios"


const {REACT_APP_BACKEND_URL, REACT_APP_VERSION} = process.env
const API_URL =`${REACT_APP_BACKEND_URL}/${REACT_APP_VERSION}`

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  };
const login=(email,password)=>{
    return axios.post(`${API_URL}/login`,{
        email,password
    }).then((response)=>{
      console.log("check login response",response)
        if(response.data.token){
          console.log("check login response",response)
            localStorage.setItem("user",JSON.stringify(response.data))
        }
        console.log(response)
        return response.data
        
    });

}
const forgot = ( email) => {
  return axios.post(`${API_URL}/admin/forgot_password`, {
    email
  });
};


const reset=(Password,ConfirmPassword,token)=>{
  return axios.post(`${API_URL}/admin/reset_password/${token}`, {
    Password,ConfirmPassword
  });
}

const logout=()=>{
  localStorage.removeItem("user")
}


export default {
    register,
    login,
    forgot,
    reset,
    logout
   
  };