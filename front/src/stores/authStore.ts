import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('authenticatedUser', {
    state: () => ({
        authToken: ref(),
        userData: ref({
            idUser: 0,
            accountNumber: '',
            id_role: 0,
            email: '',
            amount: 0
        })
    }),

    getters: {
        userToken: (state) => state.authToken,
    },

    actions: {
        setUserToken(token: string) {
            this.authToken = token
        },
        setUserData(idUser: any,
            accountNumber: any,
            id_role: any,
            email: any,
            amount: any) {
            this.userData = {idUser, accountNumber, id_role, email, amount}
        },
        clearUserToken() {
            this.$reset();
        }

    },
    persist: {
        storage: sessionStorage
    }
});

