import axios from "axios";
import { baseApi } from "../urlConfig";

const axiosInstance = axios.create({
  baseURL: baseApi,
});

export default axiosInstance;
