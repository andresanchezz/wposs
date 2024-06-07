<template>

    <section>

        <h2>Disponible: {{ moneyAvailable }}</h2>
        <h3>Número de cuenta: {{ store.userData.accountNumber }}</h3>

        <TransactionModal @updateTable="getTableData()" v-if="isModalActive" @close="isModalActive = false" :money-available="moneyAvailable"/>

        <TransactionsTable :table-data="dataTable" />

        <section >
            <ActionButton @click="isModalActive = true" :text="'Realizar una transacción'" :bg="'var(--primary-color)'"/>
            <CommonButton @click="closeSession" :text="'Cerrar sesión'"/>
        </section>

    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type{ Ref } from 'vue';
import TransactionsTable from '../components/TransactionsTable.vue';
import ActionButton from '@/modules/shared/components/ActionButton.vue';
import CommonButton from '@/modules/shared/components/CommonButton.vue';
import TransactionModal from '../components/TransactionModal.vue';
import { useAuthStore } from '@/stores/authStore';
import handleRequest from '@/modules/shared/utils/handleErrors.utils';
import { HTTP } from '@/api/clientHTTP';
const store = useAuthStore();

const isModalActive:Ref<boolean> = ref(false);

const moneyAvailable = ref(store.userData.amount);

import { closeSession } from '@/modules/shared/utils/close_session.utils';

const dataTable = ref();

const getTableData = async() =>{
    dataTable.value = (await handleRequest(HTTP.get(`/transactions/${store.userData.accountNumber}`), 'Datos obtenidos')).data;
}

onMounted(()=>{
    getTableData()
})
</script>

<style lang="scss" scoped>
section{
    padding: 1rem 0;
    h2{
        margin: 1rem 0;
    }
}
</style>

