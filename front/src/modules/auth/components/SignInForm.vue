<template>
    <form @submit.prevent="logUser($event)">
        <legend>Ingresa con tu correo</legend>

        <label for="email">correo electrónico</label>
        <input type="email" id="email" name="email" required autocomplete="off">

        <label for="password">contraseña</label>
        <input type="password" id="password" name="password" required autocomplete="off">

        <input type="submit" value="enviar">
    </form>
    <RouterLink :to="{name: 'sign-up'}">Registrarme</RouterLink>
</template>

<script lang="ts" setup>
import { HTTP } from '@/api/clientHTTP';
import handleRequest from '@/modules/shared/utils/handleErrors.utils';
import { AUTH_ROUTES } from '../utils/routes.utils';
import { useAuthStore } from '@/stores/authStore';
import { parseJwt } from '@/modules/shared/utils/parseJwt.utils';
import router from '@/router';

interface ITokenData {
    email:string,
    sub: number,
    exp: number,
    id_role: number
}

const store = useAuthStore();

const logUser = async(e:Event):Promise<void> =>{

    let userData;
    if(e.target){
        userData = Object.fromEntries(new FormData(e.target));
    }
        
    const data = await handleRequest(HTTP.post(AUTH_ROUTES.LOGIN, userData));
    
    if(data.data){
        const userData = data.data
        const token = data.data.access_token
        store.setUserToken(token); 
        store.setUserData( userData.idUser, userData.accountNumber, userData.id_role, userData.email, userData.amount); 
  
        (userData.id_role === 2) ? router.push({name: 'dashboard'}) :  router.push({name: 'dashboard-admin'})
    }
}

</script>

<style lang="scss" scoped>
</style>

