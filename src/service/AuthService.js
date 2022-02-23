import axios from "axios"


const {REACT_APP_BACKEND_URL, REACT_APP_VERSION} = process.env
const API_URL =`${REACT_APP_BACKEND_URL}/api/${REACT_APP_VERSION}`

const register =async (firstname,lastname,username,email,password,occupation) => {
 
    return  await axios.post(`${API_URL}/user/signup`, {
      firstname,
      lastname,
      username,
      email,
      password,
      occupation
    }).then((response)=>{
      console.log("check login response",response)
    });
};

const login= async(email,password)=>{
  console.log("email",email)
  console.log("password",password)
    return await axios.post(`${API_URL}/user/login`,{
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
  return axios.post(`${API_URL}/auth/forgot_password`, {
    email
  });
};


const reset=(Password,ConfirmPassword,token)=>{
  return axios.post(`${API_URL}/auth/reset_password/${token}`, {
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