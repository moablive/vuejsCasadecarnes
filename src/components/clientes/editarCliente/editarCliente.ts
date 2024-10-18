import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ClientService from '@/services/ClientService';
import { Cliente } from '@/interfaces/cliente';
import Navbar from '@/components/navbar/Navbar.vue';

export default defineComponent({
    name: 'EditarCliente',
    components: {
        Navbar,
    },
    setup() {
        const cliente = ref<Cliente>({
            NOME: '',
            APELIDO: '',
            EMAIL: '',
            CNPJ: '',
            CONTATO: '',
            PAIS: '',
            ESTADO: '',
            CIDADE: '',
            BAIRRO: '',
            RUA_AV: '',
            NUMERO: '',
            COMPLEMENTO: '',
            CEP: '',
            CODIGO_TELECON: null,
            LATITUDE: null,
            LONGITUDE: null,
        });

        const router = useRouter();
        const route = useRoute();
        const clientId = Number(route.params.id);

        const fetchClient = async () => {
            try {
                const response = await ClientService.getClientById(clientId);
                cliente.value = response.data;
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            }
        };

        const updateClient = async () => {
            try {
                await ClientService.updateClient(clientId, cliente.value);
                router.push('/clientes');
            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
            }
        };

        const cancel = () => {
            router.push('/clientes');
        };

        onMounted(fetchClient);

        return {
            cliente,
            updateClient,
            cancel,
        };
    },
});
