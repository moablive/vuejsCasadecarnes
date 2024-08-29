import axios from 'axios';
import { Cliente } from '../interfaces/cliente';
import { createApp, ref } from 'vue';
import AlertToken from '../components/login/AlertToken.vue';

// Cria uma instância Vue para controlar a exibição da modal
const app = createApp(AlertToken);
const showAlert = ref(false);
const alertTitle = ref('');
const alertMessage = ref('');
const alertOnConfirm = ref<() => void>(() => {});
const alertOnClose = ref<() => void>(() => {});

app.provide('showAlert', showAlert);
app.provide('alertTitle', alertTitle);
app.provide('alertMessage', alertMessage);
app.provide('alertOnConfirm', alertOnConfirm);
app.provide('alertOnClose', alertOnClose);

// Monta a modal em um elemento específico
const modalMount = document.createElement('div');
document.body.appendChild(modalMount);
app.mount(modalMount);

// Função para exibir a modal de alerta
function notifySessionExpired() {
    showAlert.value = true;
    alertTitle.value = 'Sessão Expirada';
    alertMessage.value = 'Sua sessão expirou. Por favor, faça login novamente.';
    alertOnConfirm.value = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    alertOnClose.value = () => {
        showAlert.value = false;
    };
}

// Configura a instância do Axios para usar a URL da API
const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/clientes`,
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

// Intercepta as respostas para lidar com erros de autenticação
apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 403) {
        // Token expirado ou inválido
        notifySessionExpired();
    }
    return Promise.reject(error);
});

export default {
    registerClient(clientData: Cliente) {
        return apiClient.post('/register', clientData);
    },
    getAllClients() {
        return apiClient.get('/getAll');
    },
    getClientById(id: number) {
        return apiClient.get(`/${id}`);
    },
    updateClient(id: number, clientData: Cliente) {
        return apiClient.put(`/${id}`, clientData);
    },
    deleteClient(id: number) {
        return apiClient.delete(`/${id}`);
    },
    getNomeVendedor(codigoVendedor: number) {
        return apiClient.get(`/vendedor/${codigoVendedor}`);
    },
};
