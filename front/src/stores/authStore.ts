import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('authenticatedUser',{
    state: ()=>({
        authToken: ref(),     
    }),

    getters : {  
        userToken: (state) => state.authToken,   
    },

    actions: {
        setUserToken(token:string){
            this.authToken = token 
        },
        clearUserToken(){
            this.$reset();
        }

    },
    persist: {
        storage: sessionStorage
    }
}) ;

