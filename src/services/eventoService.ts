import apiClient from './apiClient';
import { Evento } from '../interfaces/evento';

export default {
    // Buscar todos os eventos
    getAllEventos() {
        return apiClient.get('/api/eventos/getAll');
    },

    // Buscar todos os eventos pagos
    getAllPaidEvents() {
        return apiClient.get('/api/eventos/getAll/paidEvents');
    },

    // Buscar todos os eventos não pagos
    getAllUnpaidEvents() {
        return apiClient.get('/api/eventos/getAll/unpaidEvents');
    },

    // Buscar eventos por mês e ano
    getEventosByMonthAndYear(month: string, year: string) {
        return apiClient.get(`/api/eventos/list/mes/${month}/${year}`);
    },

    // Buscar os próximos eventos que vencem nos próximos 5 dias
    getNextExpiration() {
        return apiClient.get('/api/eventos/getNextExpiration');
    },

    // Buscar um evento por ID
    getEventoById(id: number) {
        return apiClient.get(`/api/eventos/getbyid/${id}`);
    },

    // Atualizar um evento
    updateEvento(id: number, evento: Partial<Evento>) {
        return apiClient.put(`/api/eventos/update/${id}`, evento);
    },

    // Deletar um evento
    deleteEvento(id: number) {
        return apiClient.delete(`/api/eventos/delete/${id}`);
    },

    // Marcar um evento como pago
    marcarEventoComoPago(id: number) {
        return apiClient.put(`/api/eventos/marcarComoPago/${id}`);
    },

    // Marcar um evento como não pago
    marcarEventoComoNaoPago(id: number) {
        return apiClient.put(`/api/eventos/marcarComoNaoPago/${id}`);
    },
};