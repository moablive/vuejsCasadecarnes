import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

//LOGIN
import Login from './components/login/login.vue';

// HOME PAGE
import Home from './components/home/home.vue';

// Components de Cliente
import Clientes from './components/clientes/clientes/clientes.vue';
import CadastrarCliente from './components/clientes/cadastrarCliente/cadastrarCliente.vue';
import EditarCliente from './components/clientes/editarCliente/editarCliente.vue';

// Components de Vendedor
import Vendedores from './components/vendedores/vendedores/vendedores.vue';
import EditarVendedor from './components/vendedores/editarVendedor/editarVendedor.vue';
import CadastrarVendedor from './components/vendedores/cadastrarVendedor/cadastrarVendedor.vue';

// Components de Evento
import Eventos from './components/eventos/eventos/eventos.vue';

// ROTAS
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'Home', component: Home },
  { path: '/clientes', name: 'Clientes', component: Clientes },
  { path: '/cadastrar-cliente', name: 'CadastrarCliente', component: CadastrarCliente },
  { path: '/editar-cliente/:id',name: 'EditarCliente',component: EditarCliente, props: true },
  { path: '/vendedores', name: 'Vendedores', component: Vendedores },
  { path: '/editar-vendedor/:id',name: 'EditarVendedor',component: EditarVendedor,props: true },
  { path: '/cadastrar-vendedor', name: 'CadastrarVendedor', component: CadastrarVendedor },
  { path: '/eventos', name: 'Eventos', component: Eventos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;