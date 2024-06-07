import { useAuthStore } from "../../stores/authStore";

const adminGuard = async (to: any, from: any, next: any) => {
    const store = useAuthStore();
    const role = store.userData.id_role

    role === 1 ? next() : next({ name: "sign-in" });

};

export default adminGuard;
