import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ClientService from '../../../services/ClientService';
import { Cliente } from '../../../interfaces/cliente';
import Navbar from '../../navbar/Navbar.vue';

export default defineComponent({
    name: 'Clientes',
    components: {
        Navbar,
    },
    setup() {
        const clientes = ref<Cliente[]>([]);
        const searchTerm = ref('');
        const isLoading = ref(true); // Estado para controlar o carregamento
        const router = useRouter();
        const showModal = ref(false);
        const clienteIdParaDeletar = ref<number | null>(null);

        const fetchClients = async () => {
            try {
                const response = await ClientService.getAllClients();
                const clients = response.data;
        
                for (const client of clients) {
                    if (client.CODIGO_VENDEDOR) {
                        try {
                            const vendedorResponse = await ClientService.getNomeVendedor(client.CODIGO_VENDEDOR);
                            client.NOME_VENDEDOR = vendedorResponse.data?.nome || 'N/A';
                        } catch (vendedorError) {
                            console.error(`Erro ao buscar nome do vendedor para código ${client.CODIGO_VENDEDOR}:`, vendedorError);
                            client.NOME_VENDEDOR = 'Erro ao buscar nome';
                        }
                    } else {
                        client.NOME_VENDEDOR = 'N/A';
                    }
                }
        
                clientes.value = clients;
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                isLoading.value = false; // Finaliza o carregamento
            }
        };

        const handleEditClient = (id?: number) => {
            if (id !== undefined) {
                router.push(`/editar-cliente/${id}`);
            } else {
                console.error('ID do cliente é indefinido');
            }
        };

        const handleOpenModal = (id?: number) => {
            if (id !== undefined) {
                clienteIdParaDeletar.value = id;
                showModal.value = true;
            } else {
                console.error('ID do cliente é indefinido');
            }
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const confirmDelete = async () => {
            if (clienteIdParaDeletar.value !== null && clienteIdParaDeletar.value !== undefined) {
                try {
                    await ClientService.deleteClient(clienteIdParaDeletar.value);
                    fetchClients(); // Atualiza a lista após a exclusão
                    closeModal();
                } catch (error) {
                    console.error('Erro ao deletar cliente:', error);
                }
            }
        };

        const filteredClientes = computed(() => {
            return clientes.value.filter(cliente =>
                cliente.NOME?.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        const filterClients = () => {
            // This triggers reactivity for filteredClientes computed property
        };

        onMounted(fetchClients);

        return {
            clientes,
            searchTerm,
            filterClients,
            filteredClientes,
            handleEditClient,
            handleOpenModal,
            closeModal,
            confirmDelete,
            showModal,
            isLoading,
        };
    }
});
