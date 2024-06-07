<template>
    <DarkBackground>
        <form @submit.prevent="doTransaction($event)">
            <label for="select-transaction">Tipo de transacción</label>
            <select id="select-transaction" @change="verifyAmount" v-model="transactionType" required>
                <option value="WITHDRAWAL">retiro</option>
                <option value="DEPOSIT">depósito</option>
                <option value="ACCOUNTS">entre cuentas</option>
            </select>

            <fieldset v-if="transactionType == 'ACCOUNTS'">
                <label for="account-number">número de cuenta</label>
                <input type="text" maxlength="36"
                id="account-number"
                name="to"
                @input="verifyAccountNumber"
                v-model="accountNumber" 
                required>
                <p class="code--error">{{ accountNumberError }}</p>
            </fieldset>

            <fieldset>
                <label for="amount">Cantidad</label>
                <input @input="verifyAmount" name="amount" id="amount" type="text" maxlength="10" v-model="transactionAmount">
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
import { HTTP } from '@/api/clientHTTP';
import handleRequest from '@/modules/shared/utils/handleErrors.utils';
import { TRANSACTION_ROUTES } from '../utils/routes.utils';
import { useAuthStore } from '@/stores/authStore';
import { parseJwt } from '@/modules/shared/utils/parseJwt.utils';

const store = useAuthStore();
const account_number = store.userData.accountNumber;

const transactionType:Ref<string | keyof typeof TRANSACTION_ROUTES> = ref('WITHDRAWAL');
const accountNumber:Ref<string> = ref('');
const accountNumberError:Ref<string> = ref('');

const transactionAmount:Ref<number> = ref(0);

const { moneyAvailable } = defineProps(['moneyAvailable']);
const moneyAvailableError:Ref<string> = ref('');

const emit = defineEmits(['updateTable'])

const verifyAccountNumber = ():boolean =>{
    const ACCOUNT_NUMBER_ERROR = 'El número de cuenta debe tener todos los dígitos'
    const isValid = accountNumber.value.length == 36

    accountNumberError.value = isValid ? '' : ACCOUNT_NUMBER_ERROR 
    return isValid
}

const verifyAmount = ():boolean =>{

    const MONEY_AVAILABLE_ERROR = 'No hay dinero suficiente';
    let isValid = transactionAmount.value < moneyAvailable

    if (transactionType.value == 'DEPOSIT' || isValid) {
        moneyAvailableError.value = '';
    }else if(transactionType.value !== 'DEPOSIT' && !isValid){
        moneyAvailableError.value = MONEY_AVAILABLE_ERROR;
    }

    return  isValid
}

const doTransaction = async(e:Event) =>{

    if (transactionType.value == 'ACCOUNTS' && !verifyAccountNumber() && !verifyAmount()
         || transactionType.value == 'ACCOUNTS' && !verifyAccountNumber() && verifyAmount()
         || transactionType.value == 'ACCOUNTS' && verifyAccountNumber() && !verifyAmount()
         || transactionType.value == 'WITHDRAWAL' && !verifyAmount()) {
        return;
    }

    let userData = Object.fromEntries(new FormData(e.target));
    userData.amount = Number(userData.amount);

    userData = {...userData, account: account_number}

    //peticion
    
        handleRequest(HTTP.post(TRANSACTION_ROUTES[transactionType.value], userData), 'Transacción realizada');
    
        if(transactionType.value == "ACCOUNTS" || "WITHDRAWAL"){
            store.updateAmount(store.getUserData.amount -= transactionAmount.value);
        }else{
            store.updateAmount(store.getUserData.amount += transactionAmount.value);
        }

    emit('updateTable');

}



</script>

<style lang="scss" scoped>
    form{
        padding: 1rem;
        background: #fff;
        border-radius: .3rem;
    }
</style>

