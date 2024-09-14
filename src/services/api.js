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

export {
    callRegister,
}