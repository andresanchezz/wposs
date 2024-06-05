<template>
    <form>
        <legend>Registrar un usuario</legend>

        <label for="name">nombre</label>
        <input type="text" id="name" name="name" required autocomplete="off">

        <label for="id">identificación</label>
        <input type="number" id="id" name="id" required autocomplete="off">
        <p v-if="idError" class="code--error">{{idError}}</p>

        <label for="email">correo electrónico</label>
        <input type="email" id="email" name="email" required autocomplete="off">
        <p v-if="emailError" class="code--error">{{emailError}}</p>

        <label for="password">contraseña</label>
        <input type="password" id="password" name="password" required autocomplete="off"
        v-model="password" @input="validatePassword">
        <p v-if="password" class="code--error">{{passwordError}}</p>

        <input type="submit" value="enviar"></input>

    </form>
    <RouterLink :to="{name: 'sign-in'}">Ya tengo una cuenta</RouterLink>
</template>

<script lang="ts" setup>
import { ref} from 'vue';
import type { Ref } from 'vue';

const password:Ref<string> = ref('');
const passwordError:Ref<string> = ref('');
const REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{4,}$/

const idError:Ref<string> = ref('');
const emailError:Ref<string> = ref('');


const validatePassword = ():boolean =>{
    const PASSWORD_ERROR = 'Debe contener letras, números y al menos 4 caracteres';
    const isValid = REGEX.test(password.value.trim());

    passwordError.value = isValid ? '' : PASSWORD_ERROR;
    console.log(isValid);
    return isValid
}




</script>

<style lang="scss" scoped>

    a{
        margin: 1rem 0 0 0;
    }

    .code--error{
        color: red;
    }
</style>

