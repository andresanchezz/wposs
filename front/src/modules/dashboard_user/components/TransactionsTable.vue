<template>
    <table>
        <thead>
            <tr>
                <th>transaccion id</th>
                <th>tipo de transacción</th>
                <th>monto</th>
            </tr>
        </thead>


        <tbody>
            <tr v-for="item in tableData">
                <td>{{ item.id }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.amount }}</td>
            </tr>
        </tbody>

    </table>
</template>

<script lang="ts" setup>

interface IProps {
    tableData:ITableItems[]
}

interface ITableItems {
    type: string,
    id:number,
    amount: number,
}


defineProps<IProps>();

</script>

<style lang="scss" scoped>
</style>
