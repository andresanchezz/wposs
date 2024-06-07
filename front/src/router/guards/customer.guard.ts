import { useAuthStore } from "../../stores/authStore";

const customerGuard = async (to: any, from: any, next: any) => {
  const store = useAuthStore();
  const role = store.userData.id_role

  role === 2 ? next() : next({ name: "sign-in" });
};

export default customerGuard;
