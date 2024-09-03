import axios from 'axios';
import { Evento } from '../interfaces/evento';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/eventos`,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default {
    getAllEventos() {
        return apiClient.get('/getAll');
    },
    getEventosByMonthAndYear(month: string, year: string) {
        return apiClient.get(`/list/mes/${month}/${year}`);
    },
    getEventoById(id: number) {
        return apiClient.get(`/getbyid/${id}`);
    },
    updateEvento(id: number, evento: Partial<Evento>) {
        return apiClient.put(`/update/${id}`, evento);
    },
    deleteEvento(id: number) {
        return apiClient.delete(`/delete/${id}`);
    },
    marcarEventoComoPago(id: number) {
        return apiClient.put(`/marcarComoPago/${id}`);
    },
    marcarEventoComoNaoPago(id: number) {
        return apiClient.put(`/marcarComoNaoPago/${id}`);
    },
};