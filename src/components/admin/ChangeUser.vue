<template>
    <AdminHome>
        <!--向插槽内填入信息-->
        <template #content>
            <n-space vertical>
                <n-layout>
                    <n-layout-header style="background-color: greenyellow; height: 300px;">haojo</n-layout-header>
                    <n-divider />
                </n-layout>
                <n-data-table :bordered="false" :single-line="false" :columns="columns" :data="data"
                    :pagination="pagination" />
            </n-space>
        </template>
    </AdminHome>

</template>

<script lang="ts" setup name="changeUser">
import AdminHome from '@/components/admin/AdminHome.vue';
import { h, defineComponent, ref } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type RowData = {
    id: number
    name: string
    email: string
    phone: string
}

const createColumns = ({
    deleteUser
}: {
    deleteUser: (rowData: RowData) => void
}): DataTableColumns<RowData> => {
    return [
        {
            title: 'id',
            key: 'id'
        },
        {
            title: '姓名',
            key: 'name'
        },
        {
            title: '邮箱',
            key: 'email'
        },
        {
            title: '电话',
            key: 'phone'
        },
        {
            title: '操作',
            key: 'submit',
            render(row) {
                return h(
                    NButton,
                    {
                        size: 'small',
                        onClick: () => deleteUser(row)
                    },
                    { default: () => '删除' }
                )
            }
        }
    ]
}

const data = ref<RowData[]> ([
    {
        id: 1222,
        name: 'sadsd',
        email: '12312312@gmail.com',
        phone: '12231231'
    },
    {
        id: 1222,
        name: 'sadsd',
        email: '12312312@gmail.com',
        phone: '12231231'
    },
    {
        id: 1222,
        name: 'sadsd',
        email: '12312312@gmail.com',
        phone: '12231231'
    },
    {
        id: 1222,
        name: 'sadsd',
        email: '12312312@gmail.com',
        phone: '12231231'
    }
])


        const message = useMessage();

        const columns = createColumns({deleteUser(rowData){
            rowData.name = "你好";
            message.info('删除用户：' + rowData.name + ' 成功!');
        }});
        const pagination = {
            pageSize: 10
        }
</script>

<style></style>