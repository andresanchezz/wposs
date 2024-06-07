import { useAuthStore } from "@/stores/authStore";
import router from "@/router";
const store = useAuthStore();

export const closeSession = () =>{
    store.clearUserToken();
    router.push({name: 'sign-in'})
}