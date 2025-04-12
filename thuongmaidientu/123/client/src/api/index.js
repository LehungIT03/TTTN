import axios from 'axios';

export const URL = 'http://localhost:5000';

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPost = (payload) => axios.post(`${URL}/posts`, payload);
export const updatePost = (payload) =>
axios.post(`${URL}/posts/update`, payload);

export const fetchUsers = () => axios.get(`${URL}/users`);
export const createUser = (payload) => axios.post(`${URL}/users`, payload);
export const updateUser = (payload) =>
axios.post(`${URL}/users/update`, payload);

export const fetchCars = () => axios.get(`${URL}/cars`);
export const fetchCar = (payload) => axios.post(`${URL}/cars/get`, payload);

export const fetchContactByUserId = (payload) => axios.post(`${URL}/detailscontracts/by-useId`, payload);
export const fetchContactByAdmin = () => axios.get(`${URL}/detailscontracts/admin`);

export const fetchRemoveDetailContract = (payload) => axios.post(`${URL}/detailscontracts/remove`, payload);
export const fetchRemoveContract = (payload) => axios.post(`${URL}/contracts/remove`, payload);

export const createCar = (payload) => axios.post(`${URL}/cars`, payload);

export const updateCar = (payload) =>

    axios.post(`${URL}/cars/update`, payload);


export const removeCar = (id) => axios.delete(`${URL}/cars/remove`, { data: { _id: id } });

export const updateContract = (payload) => axios.post(`${URL}/contracts/update`, payload)

export const getReportData = (payload) => axios.get(`${URL}/contracts/revenue-report`, {params: payload})