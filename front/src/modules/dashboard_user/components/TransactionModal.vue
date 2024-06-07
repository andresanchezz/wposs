<template>
    <DarkBackground>
        <form @submit.prevent="doTransaction">
            <label for="select-transaction">Tipo de transacción</label>
            <select name="select-transaction" id="select-transaction" @change="verifyAmount" v-model="transactionType" required>
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
                <input @input="verifyAmount" type="text" maxlength="10" v-model="transactionAmount">
            </fieldset>

            <p class="code--error"> {{ moneyAvailableError }}</p>

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
const accountNumberError:Ref<string> = ref('');

const transactionAmount:Ref<number> = ref(0);

const { moneyAvailable } = defineProps(['moneyAvailable']);
const moneyAvailableError:Ref<string> = ref('');

const verifyAccountNumber = ():boolean =>{
    const ACCOUNT_NUMBER_ERROR = 'El número de cuenta debe tener 10 dígitos'
    const isValid = accountNumber.value.toString().length == 10
    accountNumber.value = accountNumber.value.toString().replace(/\D/g, '');

    accountNumberError.value = isValid ? '' : ACCOUNT_NUMBER_ERROR 
    return isValid
}

const verifyAmount = ():boolean =>{

    const MONEY_AVAILABLE_ERROR = 'No hay dinero suficiente';
    let isValid = transactionAmount.value < moneyAvailable

    if (transactionType.value == 2 || isValid) {
        moneyAvailableError.value = '';
    }else if(transactionType.value !== 2 && !isValid){
        moneyAvailableError.value = MONEY_AVAILABLE_ERROR;
    }

    return  isValid
}

const doTransaction = () =>{

    if (transactionType.value == 3 && !verifyAccountNumber() && !verifyAmount()
         || transactionType.value == 3 && !verifyAccountNumber() && verifyAmount()
         || transactionType.value == 3 && verifyAccountNumber() && !verifyAmount()
         || transactionType.value == 1 && !verifyAmount()) {
        return;
    }

    //peticion

}



</script>

<style lang="scss" scoped>
    form{
        padding: 1rem;
        background: #fff;
        border-radius: .3rem;
    }
</style>

