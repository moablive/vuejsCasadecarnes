import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import ClientService from '../../../services/ClientService';
import { Cliente } from '../../../interfaces/cliente';
import Navbar from '../../navbar/Navbar.vue';

export default defineComponent({
    name: 'CadastrarCliente',
    components: {
        Navbar,
    },
    setup() {
        const cliente = ref<Cliente>({
            NOME: '',
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
        });
        const router = useRouter();

        const saveClient = async () => {
            try {
                await ClientService.registerClient(cliente.value);
                router.push('/clientes');
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
            }
        };

        const cancel = () => {
            router.push('/clientes');
        };

        return {
            cliente,
            saveClient,
            cancel,
        };
    },
});