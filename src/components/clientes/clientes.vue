<template>
    <Navbar />
    <div class="container mt-5">
        <h1 class="mb-4">Clientes</h1>
        <ul class="list-group mb-4">
            <li class="list-group-item" v-for="cliente in clientes" :key="cliente.ID">
                <div>
                    <strong>Nome:</strong> {{ cliente.NOME }}<br>
                    <strong>Email:</strong> {{ cliente.EMAIL }}<br>
                    <strong>CNPJ:</strong> {{ cliente.CNPJ }}<br>
                    <strong>Contato:</strong> {{ cliente.CONTATO }}<br>
                    <strong>País:</strong> {{ cliente.PAIS }}<br>
                    <strong>Estado:</strong> {{ cliente.ESTADO }}<br>
                    <strong>Cidade:</strong> {{ cliente.CIDADE }}<br>
                    <strong>Bairro:</strong> {{ cliente.BAIRRO }}<br>
                    <strong>Rua/Av:</strong> {{ cliente.RUA_AV }}<br>
                    <strong>Número:</strong> {{ cliente.NUMERO }}<br>
                    <strong>Complemento:</strong> {{ cliente.COMPLEMENTO }}<br>
                    <strong>CEP:</strong> {{ cliente.CEP }}<br>
                    <strong>Código TELECON:</strong> {{ cliente.CODIGO_TELECON }}
                </div>
                <div class="mt-3">
                    <button class="btn btn-primary btn-sm me-2" @click="editClient(cliente)">Editar</button>
                    <button class="btn btn-danger btn-sm" @click="deleteClient(cliente.ID)">Excluir</button>
                </div>
            </li>
        </ul>
        <div class="container">
            <form @submit.prevent="saveClient">
                <div class="mb-3">
                    <input v-model="novoCliente.NOME" class="form-control" placeholder="Nome" required />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.EMAIL" class="form-control" placeholder="Email" required />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.CNPJ" class="form-control" placeholder="CNPJ" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.CONTATO" class="form-control" placeholder="Contato" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.PAIS" class="form-control" placeholder="País" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.ESTADO" class="form-control" placeholder="Estado" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.CIDADE" class="form-control" placeholder="Cidade" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.BAIRRO" class="form-control" placeholder="Bairro" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.RUA_AV" class="form-control" placeholder="Rua/Av" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.NUMERO" class="form-control" placeholder="Número" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.COMPLEMENTO" class="form-control" placeholder="Complemento" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.CEP" class="form-control" placeholder="CEP" />
                </div>
                <div class="mb-3">
                    <input v-model="novoCliente.CODIGO_TELECON" class="form-control" placeholder="Código TELECON" />
                </div>
                <button class="btn btn-success" type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }} Cliente</button>
                <button class="btn btn-secondary ms-2" type="button" @click="cancelEdit" v-if="editando">Cancelar</button>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ClientService from '@/services/ClientService';
import { Cliente } from '@/interfaces/cliente';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'Clientes',
    components: {
        Navbar,
    },
    setup() {
        const clientes = ref<Cliente[]>([]);
        const novoCliente = ref<Cliente>({
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
            CODIGO_TELECON: null // Certifique-se de inicializar o campo
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
                resetForm();
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
            resetForm();
        };

        const resetForm = () => {
            novoCliente.value = {
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
                CODIGO_TELECON: null
            };
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
