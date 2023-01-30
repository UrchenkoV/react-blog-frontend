import axios from "axios";

const instanse = axios.create({
  baseURL: "http://localhost:5000",
});

instanse.defaults.headers.Authorization = window.localStorage.getItem("token");

export default instanse;
