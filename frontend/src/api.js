import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const fetchTasks = () => API.get("tasks/");

export const createTask = (taskData) =>
  API.post("tasks/", taskData);

export const updateTask = (id, taskData) =>
  API.put(`tasks/${id}/`, taskData);

export const deleteTask = (id) =>
  API.delete(`tasks/${id}/`);

export default API;