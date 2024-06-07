<template>
    <div class="container fade-in-bck ">
        <div class="container__slot">
            <svg @click="close" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"/></svg>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close']);
const close = () =>{
    emit('close')
}
</script>

<style lang="scss" scoped>
.container{
    position: fixed;
    inset: 0 0 0 0;
    background: rgba(0, 0, 0, 0.473);

    &__slot{
        svg{
            justify-self: right;
            font-size: 1.5rem;
            color: #fff;
            cursor: pointer;
        }
        height: 100vh;
        display: grid;
        place-content: center;
    }
}
</style>

