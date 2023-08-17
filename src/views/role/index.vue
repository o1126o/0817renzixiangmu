<template>
    <div class="box">
        <div class="role">
            <!-- 添加角色 -->
            <el-button class="addBtn" size="small" @click="addRoleBtn">添加角色</el-button>

            <!-- 表格 -->
            <el-table :data="roleList" border style="width: 100%" :header-cell-style="headerStyle">
                <el-table-column prop="id" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="name" label="角色" width="180">
                    <template v-slot="{ row }">
                        <el-input type="text" size="mini" v-model="row.edit.name" v-if="row.isEdit" />
                        <span v-else>{{ row.name }}</span>      
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="启用">
                    <template v-slot="{ row }">
                        <el-switch v-model="row.edit.state" v-if="row.isEdit" :active-value="1" :inactive-value="0">
                        </el-switch>
                        <span v-else>{{ row.state == 1 ? '已启用' : row.state == 0 ? '未启用' : '无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述">
                    <template v-slot="{ row }">
                        <el-input v-if="row.isEdit" v-model="row.edit.description" />
                        <span v-else>{{ row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="{ row }">
                        <template v-if="row.isEdit">
                            <el-button type="text" @click="handleOk(row)">确定</el-button>
                            <el-button type="text" @click="handleQX(row)">取消</el-button>
                        </template>
                        <template v-else>
                            <el-button type="text" @click="handlePer(row)">分配权限</el-button>
                            <el-button type="text" @click="handleEdit(row)">编辑 </el-button>
                            &emsp;
                            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="这是一段内容确定删除吗？"
                                @onConfirm="handleDel(row)">
                                <el-button type="text" slot="reference"> 删除</el-button>
                            </el-popconfirm>
                        </template>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination layout="prev, pager, next" :page-size="query.pagesize" :current-page="query.page"
                :total="query.totle" @current-change="handleCurrentChange">
            </el-pagination>

            <!-- 添加组件 -->
            <addRoles :dialogFormVisible.sync="dialogFormVisible" @updateRoles="GetRole"></addRoles>

            <!-- 分配权限 -->
            <addPeimission :permissionVisible.sync="permissionVisible" :currendId="currendId" ref="addPer" @updateRole="GetRole"></addPeimission>
        </div>
    </div>
</template>

<script>
import { getRole, updateRole, delRole } from "@/api/role"
import addRoles from "./component/add-role.vue"
import addPeimission from "./component/add-peimission.vue"
export default {
    data() {
        return {
            query: {
                page: 1,
                pagesize: 5,
                totle: 0
            },
            roleList: [],
            dialogFormVisible: false, // 添加组件状态
            permissionVisible: false,
            currendId: null,
        }
    },
    methods: {
        // 分配权限
        handlePer(row) {
            console.log(row);
            // this.permissionVisible = true
            this.currendId = row.id
            this.$nextTick(() => {
                this.$refs.addPer.queryPermission()
            })
        },
        // 获取所有角色
        async GetRole() {
            let res = await getRole(this.query)
            this.roleList = res.rows
            this.query.totle = res.total
            this.roleList.forEach(item => {
                // 要动态添加 使用$set
                this.$set(item, 'isEdit', false)
                this.$set(item, 'edit', {
                    name: item.name,
                    state: item.state,
                    description: item.description
                })
            })
        },
        //  分页
        handleCurrentChange(val) {
            this.query.page = val
            this.GetRole()
        },
        // 编辑
        handleEdit(row) {
            row.isEdit = true
            row.edit.name = row.name
            row.edit.state = row.state
            row.edit.description = row.description
        },
        // 确定
        async handleOk(row) {
            if (row.edit.name && row.edit.description) {
                let res = await updateRole({ ...row.edit, id: row.id })
                this.$message.success("添加成功")
                Object.assign(row, {
                    ...row.edit,
                    isEdit: false
                })
            } else {
                this.$message.warning("角色名称或角色描述不能为空！")
            }
        },
        // 取消
        handleQX(row) {
            row.isEdit = false
        },
        // 添加
        addRoleBtn() {
            this.dialogFormVisible = true
        },
        // 删除
        handleDel(row) {
            delRole(row.id).then(res => {
                this.$message.success('删除成功')
                this.GetRole()
            })
        }
    },
    created() {
        this.GetRole()
    },
    mounted() {

    },
    components: {
        addRoles,
        addPeimission
    },
    computed: {
        headerStyle() {
            return { "background-color": "#f5f6f8", "color": "#909399" }
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

    .role {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 25px;
        font-size: 14px;

        .addBtn {
            background-color: #2752fb;
            color: #fff;
        }

        .el-table {
            margin: 10px 0 40px 0;
        }
    }
}

.el-pagination {
    text-align: center;
}
</style>
