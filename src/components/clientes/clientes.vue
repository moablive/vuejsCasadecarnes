<template>
    <div class="container mt-5">
        <h1 class="mb-4">Clientes</h1>
        <ul class="list-group mb-4">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="cliente in clientes" :key="cliente.ID">
                <span>{{ cliente.NOME }} - {{ cliente.EMAIL }}</span>
                <div>
                    <button class="btn btn-primary btn-sm me-2" @click="editClient(cliente)">Editar</button>
                    <button class="btn btn-danger btn-sm" @click="deleteClient(cliente.ID)">Excluir</button>
                </div>
            </li>
        </ul>
        <form @submit.prevent="saveClient">
            <div class="mb-3">
                <input v-model="novoCliente.NOME" class="form-control" placeholder="Nome" required />
            </div>
            <div class="mb-3">
                <input v-model="novoCliente.EMAIL" class="form-control" placeholder="Email" required />
            </div>
            <!-- Adicione mais campos conforme necessário -->
            <button class="btn btn-success" type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }} Cliente</button>
            <button class="btn btn-secondary ms-2" type="button" @click="cancelEdit" v-if="editando">Cancelar</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ClientService from '@/services/ClientService';
import { Cliente } from '@/interfaces/Cliente';

export default defineComponent({
    name: 'Clientes',
    setup() {
        const clientes = ref<Cliente[]>([]);
        const novoCliente = ref<Cliente>({
            NOME: '',
            EMAIL: '',
        });
        const editando = ref(false);
        const clienteAtual = ref<Cliente | null>(null);

        const fetchClients = async () => {
            try {
                const response = await ClientService.getAllClients();
                clientes.value = response.data;
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        const saveClient = async () => {
            try {
                if (editando.value && clienteAtual.value?.ID) {
                    await ClientService.updateClient(clienteAtual.value.ID, novoCliente.value);
                    editando.value = false;
                } else {
                    await ClientService.registerClient(novoCliente.value);
                }
                fetchClients(); 
                novoCliente.value = { NOME: '', EMAIL: '' }; 
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
            }
        };

        const deleteClient = async (id?: number) => {
            if (!id) return;
            try {
                await ClientService.deleteClient(id);
                fetchClients(); 
            } catch (error) {
                console.error(`Erro ao deletar cliente com ID ${id}:`, error);
            }
        };

        const editClient = (cliente: Cliente) => {
            clienteAtual.value = cliente;
            novoCliente.value = { ...cliente };
            editando.value = true;
        };

        const cancelEdit = () => {
            editando.value = false;
            novoCliente.value = { NOME: '', EMAIL: '' };
        };

        onMounted(fetchClients);

        return {
            clientes,
            novoCliente,
            editando,
            saveClient,
            deleteClient,
            editClient,
            cancelEdit,
        };
    },
});
</script>

<style scoped>
button {
    margin-left: 10px;
}
</style>
