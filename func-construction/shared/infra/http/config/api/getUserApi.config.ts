import axios from "axios";

const UserAPI = axios.create({
    baseURL: process.env.URL_USER
});

export { UserAPI };