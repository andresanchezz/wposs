<template>
    <section>

        <div class="form-container">
            <RouterView />
        </div>

    </section>

</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
section {
    height: 100vh;
    display: flex;

    a {
        text-align: end
    }

    .form-container {
        flex-grow: 1;
        display: grid;
        place-content: center;
        max-width: 36rem;
        margin: auto;
    }
}
</style>
