import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/user/";

const register = (data) => {
    console.log(data);
    return axios.post(API_URL + "signup", data);
};

const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const forgot = (email) => {
    return axios.post(`${API_URL}/auth/forgot_password`, {
        email,
    });
};

const reset = (Password, ConfirmPassword, token) => {
    return axios.post(`${API_URL}/auth/reset_password/${token}`, {
        Password,
        ConfirmPassword,
    });
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.clear();
};

export default {
    register,
    login,
    forgot,
    reset,
    logout,
};
