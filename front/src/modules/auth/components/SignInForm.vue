<template>
    <form>
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
</script>

<style lang="scss" scoped>
</style>

