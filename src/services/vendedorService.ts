import axios from 'axios';
import { Vendedor } from '../interfaces/vendedor';

// Configura a instância do Axios para usar a URL da API
const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/vendedor`,
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
    // Registrar um novo vendedor
    registerVendedor(vendedorData: Vendedor) {
        return apiClient.post('/register', vendedorData);
    },

    // Buscar todos os vendedores
    getAllVendedores() {
        return apiClient.get('/getAll');
    },

    // Buscar um vendedor por ID
    getVendedorById(id: number) {
        return apiClient.get(`/getbyid/${id}`);
    },

    // Atualizar um vendedor
    updateVendedor(id: number, vendedorData: Vendedor) {
        return apiClient.put(`/update/${id}`, vendedorData);
    },

    // Deletar um vendedor
    deleteVendedor(id: number) {
        return apiClient.delete(`/delete/${id}`);
    },
};