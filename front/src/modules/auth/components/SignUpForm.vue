<template>
    <form @submit.prevent="createUser($event)">
        <legend>Registrar un usuario</legend>

        <label for="name">nombre</label>
        <input type="text" id="name" name="name" required autocomplete="off">

        <label for="id_role">tipo de usuario</label>
        <select name="id_role" id="id_role">
            <option v-for="rol in roles" :value="rol.id">{{ rol.name }}</option>
        </select>

        <label for="identification">identificación</label>
        <input type="number" id="identification" name="identification" required autocomplete="off">

        <label for="email">correo electrónico</label>
        <input type="email" id="email" name="email" required autocomplete="off">

        <label for="password">contraseña</label>
        <input type="password" id="password" name="password" required autocomplete="off"
        v-model="password" @input="validatePassword">
        <p v-if="password" class="code--error">{{passwordError}}</p>

        <input type="submit" value="enviar"></input>

    </form>
    <RouterLink :to="{name: 'sign-in'}">Ya tengo una cuenta</RouterLink>
</template>

<script lang="ts" setup>
import { ref, onMounted} from 'vue';
import type { Ref } from 'vue';
import { HTTP } from '../../../api/clientHTTP';
import { AUTH_ROUTES } from '../utils/routes.utils';
import handleRequest from '@/modules/shared/utils/handleErrors.utils';


const password:Ref<string> = ref('');
const passwordError:Ref<string> = ref('');
const REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{5,}$/

const roles = ref();

const validatePassword = ():boolean =>{
    const PASSWORD_ERROR = 'Debe contener letras, números y al menos 5 caracteres';
    const isValid = REGEX.test(password.value.trim());

    passwordError.value = isValid ? '' : PASSWORD_ERROR;

    return isValid
}

const createUser = async(e:Event) =>{
    
    let userData = Object.fromEntries(new FormData(e.target));
    userData.id_role = Number(userData.id_role);

    if(!validatePassword()){
        return
    }else{
        
        const user = await handleRequest(HTTP.post(AUTH_ROUTES.REGISTER,  userData), 'Creado con éxito');
        if(user){
            const form = document.querySelector('form');
            if(form){
                form.reset()
            }
        }
    }
}

const getRoles = async() =>{
    roles.value = (await HTTP.get(AUTH_ROUTES.ROLES)).data;
}


onMounted(()=>{
    getRoles();
})

</script>

<style lang="scss" scoped>

    a{
        margin: 1rem 0 0 0;
    }
</style>

