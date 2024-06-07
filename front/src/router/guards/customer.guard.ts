import { useAuthStore } from "../../stores/authStore";

const customerGuard = async (to: any, from: any, next: any) => {
  const store = useAuthStore();
  const token = store.userToken

  token ? next() : next({ name: "sign-in" })
};

export default customerGuard;
