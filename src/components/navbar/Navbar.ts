import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const router = useRouter();

    // Função de logout movida para dentro do componente
    function logout() {
      // Remove o token e redireciona para a página de login
      localStorage.removeItem('token');
      router.push('/');
    }

    return {
      router,
      logout,  // Exportando a função para ser usada no template
    };
  },
});