import apiClient from './apiClient';
import { Cliente } from '../interfaces/cliente';

export default {
    registerClient(clientData: Cliente) {
        return apiClient.post('/api/clientes/register', clientData);
    },
    getAllClients() {
        return apiClient.get('/api/clientes/getAll');
    },
    getClientById(id: number) {
        return apiClient.get(`/api/clientes/${id}`);
    },
    getVendedorNomeById(id: number) {
        return apiClient.get(`/api/clientes/vendedor/${id}`);
    },
    updateClient(id: number, clientData: Cliente) {
        return apiClient.put(`/api/clientes/${id}`, clientData);
    },
    deleteClient(id: number) {
        return apiClient.delete(`/api/clientes/${id}`);
    },
};