<template>
    <table>
        <thead>
            <tr>
                <th>tipo de transacción</th>
                <th>fecha</th>
                <th>monto</th>
            </tr>
        </thead>


        <tbody>
            <tr v-for="item in tableData">
                <td>{{ item.identification }}</td>

            </tr>
        </tbody>

    </table>
</template>

<script lang="ts" setup>

interface IProps {
    tableData:ITableItems[]
}

interface ITableItems {
    identification:string;
}


defineProps<IProps>();

</script>

<style lang="scss" scoped>
</style>
