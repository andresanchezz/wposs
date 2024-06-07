<template>

    <section>

        <h2>Disponible: {{ moneyAvailable }}</h2>

        <TransactionModal v-if="isModalActive" @close="isModalActive = false"/>

        <TransactionsTable />

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

const isModalActive:Ref<boolean> = ref(false);

const moneyAvailable = ref(0);

import { closeSession } from '@/modules/shared/utils/close_session.utils';
</script>

<style lang="scss" scoped>
section{
    padding: 1rem 0;
    h2{
        margin: 1rem 0;
    }
}
</style>

