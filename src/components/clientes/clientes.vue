<template>
    <Navbar />
    <div class="p-5 mt-5">
        <h1 class="text-2xl font-bold mb-4">Clientes</h1>
        <!-- Tabela responsiva -->
        <div class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full bg-white">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="py-2 px-3 text-left">Nome</th>
                        <th class="py-2 px-3 text-left">Email</th>
                        <th class="py-2 px-3 text-left">CNPJ</th>
                        <th class="py-2 px-3 text-left">Contato</th>
                        <th class="py-2 px-3 text-left">País</th>
                        <th class="py-2 px-3 text-left">Estado</th>
                        <th class="py-2 px-3 text-left">Cidade</th>
                        <th class="py-2 px-3 text-left">Bairro</th>
                        <th class="py-2 px-3 text-left">Rua/Av</th>
                        <th class="py-2 px-3 text-left">Número</th>
                        <th class="py-2 px-3 text-left">Complemento</th>
                        <th class="py-2 px-3 text-left">CEP</th>
                        <th class="py-2 px-3 text-left">Código TELECON</th>
                        <th class="py-2 px-3 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr v-for="(cliente, index) in clientes" :key="cliente.ID"
                        :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'" class="border-b">
                        <td class="py-2 px-3">{{ cliente.NOME }}</td>
                        <td class="py-2 px-3">{{ cliente.EMAIL }}</td>
                        <td class="py-2 px-3">{{ cliente.CNPJ }}</td>
                        <td class="py-2 px-3">{{ cliente.CONTATO }}</td>
                        <td class="py-2 px-3">{{ cliente.PAIS }}</td>
                        <td class="py-2 px-3">{{ cliente.ESTADO }}</td>
                        <td class="py-2 px-3">{{ cliente.CIDADE }}</td>
                        <td class="py-2 px-3">{{ cliente.BAIRRO }}</td>
                        <td class="py-2 px-3">{{ cliente.RUA_AV }}</td>
                        <td class="py-2 px-3">{{ cliente.NUMERO }}</td>
                        <td class="py-2 px-3">{{ cliente.COMPLEMENTO }}</td>
                        <td class="py-2 px-3">{{ cliente.CEP }}</td>
                        <td class="py-2 px-3">{{ cliente.CODIGO_TELECON }}</td>
                        <td class="py-2 px-3 flex space-x-2">
                            <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                @click="editClient(cliente.ID)">
                                Editar
                            </button>
                            <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                @click="openModal(cliente.ID)">
                                Deletar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal de Confirmação -->
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 relative z-50">
                <h2 class="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                <p class="mb-4">Tem certeza de que deseja excluir este cliente?</p>
                <div class="flex justify-end">
                    <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                        @click="closeModal">Cancelar</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        @click="confirmDelete">Deletar</button>
                </div>
            </div>
            <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ClientService from '../../services/ClientService';
import { Cliente } from '../../interfaces/cliente';
import Navbar from '../Navbar.vue';

export default defineComponent({
    name: 'Clientes',
    components: {
        Navbar,
    },
    setup() {
        const clientes = ref<Cliente[]>([]);
        const router = useRouter();
        const showModal = ref(false);
        const clienteIdParaDeletar = ref<number | null>(null);

        const fetchClients = async () => {
            try {
                const response = await ClientService.getAllClients();
                clientes.value = response.data;
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        const editClient = (id: number) => {
            router.push(`/editar-cliente/${id}`);
        };

        const openModal = (id: number) => {
            clienteIdParaDeletar.value = id;
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const confirmDelete = async () => {
            if (clienteIdParaDeletar.value !== null && clienteIdParaDeletar.value !== undefined) {
                try {
                    await ClientService.deleteClient(clienteIdParaDeletar.value!);
                    fetchClients(); // Atualiza a lista após a exclusão
                    closeModal();
                } catch (error) {
                    console.error('Erro ao deletar cliente:', error);
                }
            }
        };

        onMounted(fetchClients);

        return {
            clientes,
            editClient,
            openModal,
            closeModal,
            confirmDelete,
            showModal,
        };
    }
});
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>