<template>
    <DarkBackground>
        <form>
            <label for="select-transaction">Tipo de transacción</label>
            <select name="select-transaction" id="select-transaction" v-model="transactionType" required>
                <option value="1">retiro</option>
                <option value="2">depósito</option>
                <option value="3">entre cuentas</option>
            </select>

            <fieldset v-if="transactionType == 3">
                <label for="account-number">número de cuenta</label>
                <input type="text" maxlength="10"
                id="account-number"
                name="account-number"
                @input="verifyAccountNumber"
                v-model="accountNumber" 
                required>
                <p class="code--error">{{ accountNumberError }}</p>
            </fieldset>

            <fieldset>
                <label for="account-number">Cantidad</label>
                <input type="text" maxlength="10">
            </fieldset>

            <input type="submit" value="enviar" >

        </form>
    </DarkBackground>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import DarkBackground from '@/modules/shared/components/DarkBackground.vue';

const transactionType:Ref<number> = ref(1);
const accountNumber:Ref<string> = ref('');
const accountNumberError:Ref<string> = ref('')

const verifyAccountNumber = ():boolean =>{
    const ACCOUNT_NUMBER_ERROR = 'El número de cuenta debe tener 10 dígitos'
    const isValid = accountNumber.value.toString().length == 10
    accountNumber.value = accountNumber.value.toString().replace(/\D/g, '');

    accountNumberError.value = isValid ? '' : ACCOUNT_NUMBER_ERROR 
    return isValid
}

</script>

<style lang="scss" scoped>
    form{
        padding: 1rem;
        background: #fff;
        border-radius: .3rem;
    }
</style>

