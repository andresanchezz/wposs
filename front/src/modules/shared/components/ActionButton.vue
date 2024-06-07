<template>
    <button :style="{backgroundColor: bg ? bg : 'var(--gray-color)'}">{{ text || 'botón' }}</button>
</template>

<script lang="ts"setup>
interface IProps {
    text:string,
    bg:string
}

defineProps<IProps>();
</script>

<style lang="scss" scoped>
button{
  border: 0;
  border-radius: .3rem;
  padding: .4rem 1rem;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background: none;
}

</style>