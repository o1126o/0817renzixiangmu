<template>
    <div class="box">
        <div class="permission">
            <el-button type="primary" size="mini" @click="handleAddAll">
                添加权限
            </el-button>

            <!-- 表格 -->
            <el-table border :header-cell-style="handleStyle" :data="data" row-key="id" default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="名称">
                </el-table-column>
                <el-table-column prop="code" label="标识">
                </el-table-column>
                <el-table-column prop="description" label="描述">
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <el-button type="text" v-if="row.type === 1" @click="handleAdd(row)">添加</el-button>
                        <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
                        <el-button type="text" @click="handleDel(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <permissionPer :dialogVisible.sync="dialogVisible" :ids="ids" @priject="queryPermission" ref="permissionPerRef">
            </permissionPer>
        </div>
    </div>
</template>

<script>
import { getPermissionList, deletePer } from "@/api/permission"
import { transListToTreeData } from "@/utils/index"
import permissionPer from "./components/permissionPer.vue"
export default {
    data() {
        return {
            data: [],
            dialogVisible: false,
            ids: null
        }
    },
    methods: {
        // 获取所有权限
        async queryPermission() {
            let res = await getPermissionList()
            this.data = transListToTreeData(res, 0)
        },
        // 删除
        handleDel(row) {
            this.$confirm('确定要删除该数据吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                await deletePer(row.id)
                this.queryPermission()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 添加
        handleAddAll() {
            this.ids = 0
            this.dialogVisible = true
        },
        handleAdd(row) {
            console.log(row);
            this.ids = row.id
            this.dialogVisible = true
        },
        // 编辑
        handleEdit(id) {
            this.ids = id
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.permissionPerRef.queryDetails()
            })
        }
    },
    created() {
        this.queryPermission()
    },
    mounted() {

    },
    components: {
        permissionPer
    },
    computed: {
        handleStyle() {
            return { "background-color": '#f5f6f8', "color": '#909399' }
        }
    },
    watch: {

    },
}
</script>

<style lang='scss' scoped>
.box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;

    .permission {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 25px;
        font-size: 14px;
    }
}

.el-table {
    margin: 10px 0;
}
</style>
