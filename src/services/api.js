import axios from "../utils/axios-customize";

const callRegister = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName,
        email,
        password,
        phone,
    }
    return axios.post(URL_BACKEND, data);
}

const callLogin = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username,
        password,
    }
    return axios.post(URL_BACKEND, data);
}

const callFetchAccount = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const callLogout = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

export {
    callRegister,
    callLogin,
    callFetchAccount,
    callLogout,
}