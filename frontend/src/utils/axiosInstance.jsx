import axios from "axios";


// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});




export default axiosInstance




