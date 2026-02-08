import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
});

// Interceptor to add token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (data: any) => api.post('/auth/login', data);
export const register = (data: any) => api.post('/auth/register', data);

export const getBooks = (params?: any) => api.get('/books', { params });
export const createBook = (data: FormData) => api.post('/books', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getBorrowers = () => api.get('/borrowers');
export const getTransactions = () => api.get('/transactions');
export const createTransaction = (data: any) => api.post('/transactions', data);
export const returnBook = (id: number) => api.put(`/transactions/${id}/return`);

export const updateProfile = (id: number, data: FormData) => api.put(`/users/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;
