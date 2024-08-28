// src/services/ClientService.ts
import axios from 'axios';
import { Cliente } from '@/interfaces/Cliente';

// Configura a instância do Axios para usar a URL da API
const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/clientes`, // Certifique-se de que inclui /api/clientes
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepta todas as requisições para adicionar o token JWT no cabeçalho
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
    // Registrar um novo cliente
    registerClient(clientData: Cliente) {
        return apiClient.post('/register', clientData);
    },

    // Buscar todos os clientes (rota protegida)
    getAllClients() {
        return apiClient.get('/getAll');
    },

    // Buscar um cliente por ID (rota protegida)
    getClientById(id: number) {
        return apiClient.get(`/${id}`);
    },

    // Atualizar um cliente (rota protegida)
    updateClient(id: number, clientData: Cliente) {
        return apiClient.put(`/${id}`, clientData);
    },

    // Deletar um cliente (rota protegida)
    deleteClient(id: number) {
        return apiClient.delete(`/${id}`);
    },
};
