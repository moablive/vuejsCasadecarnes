import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import {
  UserGroupIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  ArrowRightOnRectangleIcon,
  TagIcon,
  PlusIcon
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "Navbar",
  components: {
    UserGroupIcon,
    UserIcon,
    BriefcaseIcon,
    CalendarIcon,
    ArrowRightOnRectangleIcon,
    TagIcon,
    PlusIcon
  },
  setup() {
    const router = useRouter();
    const isMenuOpen = ref(false);

    function logout() {
      localStorage.removeItem("token");
      router.push("/");
    }

    return {
      isMenuOpen,
      logout,
    };
  },
});
