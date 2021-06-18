import axios from "axios";

const GetUserAPI = axios.create({
    baseURL: process.env.URL_GET_USER
});

export { GetUserAPI };