<template>
    

    <h1>Transacciones de usuarios</h1>
    <TransactionsTable />

    <ActionButton :bg="'var(--primary-color)'" :text="'Actualizar tabla'"/>
    <CommonButton @click="closeSession" :text="'Cerrar sesión'" />


</template>

<script lang="ts" setup>
import TransactionsTable from '../components/TransactionsTable.vue';
import ActionButton from '../../shared/components/ActionButton.vue';
import CommonButton from '../../shared/components/CommonButton.vue';
import { closeSession } from '@/modules/shared/utils/close_session.utils';

const logOut = async()  =>{

}
</script>

<style lang="scss" scoped>
h1{
    text-align: center;
    margin: 0 0 1rem 0;
}

button{
    margin: 1rem 0 0 0;
}
</style>

