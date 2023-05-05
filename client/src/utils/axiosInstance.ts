import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://api-intellisense.onrender.com/"
      : "http://localhost:5000",
  withCredentials: true,
});
