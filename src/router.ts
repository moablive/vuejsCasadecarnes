import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from './components/login/login.vue';
import Home from './components/home/home.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'Home', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;