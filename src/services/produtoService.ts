import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/produtos`,
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
    // Criar um novo produto
    createProduto(produto: any) {
        return apiClient.post('/create', produto);
    },
    // Buscar todos os produtos
    getAllProdutos() {
        return apiClient.get('/getAll');
    },
    // Buscar um produto por ID
    getProdutoById(id: number) {
        return apiClient.get(`/getProdutoById/${id}`);
    },
    // Buscar um produto por código
    getProdutoByCodigoProduto(codigoProduto: string) {
        return apiClient.get(`/getProdutoByCodigoProduto/${codigoProduto}`);
    },
    // Buscar produtos por descrição
    getProdutosByDescricao(descricao: string) {
        return apiClient.get(`/getProdutosByDescricao/${descricao}`);
    },
    // Atualizar um produto
    updateProduto(id: number, produto: Partial<any>) {
        return apiClient.put(`/updateProdutoById/${id}`, produto);
    },
    // Deletar um produto
    deleteProduto(id: number) {
        return apiClient.delete(`/deleteProdutoById/${id}`);
    },
};