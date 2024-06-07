<template>
    <button>{{ text || 'botón' }}</button>
</template>

<script lang="ts"setup>
interface IProps {
    text:string,
    color?:string
}

defineProps<IProps>();
</script>

<style lang="scss" scoped>
button{
  padding: .3rem 1rem;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  background: none;
  &:hover{
    color: var(--primary-color);
  }
}

</style>