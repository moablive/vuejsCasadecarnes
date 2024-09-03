import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { UserGroupIcon, UserIcon, BriefcaseIcon, CalendarIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  name: 'Navbar',
  components: {
    UserGroupIcon,
    UserIcon,
    BriefcaseIcon,
    CalendarIcon,
    ArrowRightOnRectangleIcon,
  },
  setup() {
    const router = useRouter();

    function logout() {
      localStorage.removeItem('token');
      router.push('/');
    }

    return {
      logout,
    };
  },
});
