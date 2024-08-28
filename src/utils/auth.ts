import { Router } from 'vue-router';

export function logout(router: Router) {
  // Remove o token e redireciona para a página de login
  localStorage.removeItem('token');
  router.push('/');
}