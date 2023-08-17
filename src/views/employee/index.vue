<template>
    <div class="box">
        <div class="employee">
            <div class="left">
                <el-input placeholder="请输入员工姓名全员搜索" prefix-icon="el-icon-search" v-model="queryparams.keyword"
                    @input="queryTableSearch" />

                <el-tree ref="deptTree" node-key="id" :data="datas" :props="defaultProps" default-expand-all
                    :highlight-current="true" :expand-on-click-node="false" @current-change="selNode"></el-tree>
            </div>
            <div class="right">
                <div class="top">
                    <el-button type="primary" size="mini" @click="$router.push('employee/detail')">添加员工</el-button>
                    <el-button size="mini" @click="handleImport">excel导入</el-button>
                    <el-button size="mini" @click="handleExport">excel导出</el-button>
                </div>

                <el-table :data="list" :header-cell-style="headerStyle">
                    <el-table-column prop="staffPhoto" label="头像" width="80">
                        <template v-slot="{ row }">
                            <el-avatar :size="30" :src="row.staffPhoto" v-if="row.staffPhoto"></el-avatar>
                            <span v-else class="word">{{ row.username.charAt(0) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="姓名"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" sortable></el-table-column>
                    <el-table-column prop="workNumber" label="工号" sortable></el-table-column>
                    <el-table-column prop="formOfEmployment" label="聘用形式">
                        <template v-slot="{ row }">
                            <span>{{ row.formOfEmployment === 1 ? '正式' : row.formOfEmployment === 2 ? '非正式' : '无' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门"></el-table-column>
                    <el-table-column prop="timeOfEntry" label="入职时间" sortable></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template v-slot="{ row }">
                            <el-button type="text" @click="handleDetail(row)">查看</el-button>
                            <el-button type="text" @click="handleRole(row)">角色</el-button>
                            &emsp;
                            <el-popconfirm title="这是一段内容确定删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                                @onConfirm="handledel(row)">
                                <el-button slot="reference" type="text">删除</el-button>
                            </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination @current-change="handleCurrentChange" :current-page="queryparams.page"
                    :page-size="queryparams.pagesize" layout="total, prev, pager, next" :total="queryparams.total">
                </el-pagination>
            </div>

            <!-- 导入 -->
            <importFiel :showExcelDialog.sync="showExcelDialog" @uploadExcel="getEmployee"></importFiel>

            <!-- 分配角色 -->
            <assigningRoles :roleDialog.sync="roleDialog" ref="assignRole" :roleId="roleId"></assigningRoles>
        </div>
    </div>
</template>

<script>
import { getDepartment } from "@/api/table";
import { getEmployeeList, delEmployeeDetail, exportEmployee, getEmployeeDetail } from "@/api/employee"
import { transListToTreeData } from "@/utils/index"
import { saveAs } from 'file-saver';
import router from "@/router";
import importFiel from "./components/import-fiel.vue"
import assigningRoles from "./components/assigning-roles.vue";
export default {
    data() {
        return {
            datas: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            queryparams: {
                departmentId: null,
                page: 1,
                pagesize: 10,
                keyword: "",
                total: 0
            },
            list: [],
            showExcelDialog: false,
            roleDialog: false,
            roleId: null
        }
    },
    created() {
        this.queryDepartment()
        this.getEmployee()
    },
    methods: {
        // 分配角色
        handleRole(row) {
            this.roleDialog = true
            this.roleId = row.id
            this.$nextTick(() => {
                this.$refs.assignRole.queryRoles()
            })
        },
        async queryDepartment() {
            let res = await getDepartment()
            this.datas = transListToTreeData(res, 0)
            // 初始化首个节点
            this.queryparams.departmentId = this.datas[0].id
            // 设置选中节点
            // 树组件的渲染是异步的，等待更新完毕  nextTick
            this.$nextTick(() => {
                this.$refs.deptTree.setCurrentKey(this.queryparams.departmentId)
            })
        },
        // 点击节点  更改节点id
        selNode(node) {
            this.queryparams.departmentId = node.id
            this.getEmployee() // 更改节点，右侧表格切换数据
        },
        // 获取右侧表格员工数据
        async getEmployee() {
            let res = await getEmployeeList(this.queryparams)
            let { rows, total } = res
            this.list = rows
            this.queryparams.total = total
        },
        // 模糊搜索
        queryTableSearch() {
            clearTimeout(this.timerId)
            this.timerId = setTimeout(() => {
                // 将数据切换到第一页
                this.queryparams.page = 1
                // 重新请求数据
                this.getEmployee()
            }, 300)
        },
        // 跳转查看页面 编辑
        handleDetail(row) {
            this.$router.push(`employee/detail/${row.id}`)
        },
        // 删除
        handledel(row) {
            delEmployeeDetail(row.id)
            this.$message.success('删除成功')
            this.getEmployee()
        },
        // 分页
        handleCurrentChange(val) {
            console.log(val);
            this.queryparams.page = val
            this.getEmployee()
        },
        // 导出文件
        async handleExport() {
            let res = await exportEmployee()
            console.log(res,'00000');
            saveAs(res, '员工信息表.xlsx')
        },
        // 导入显示
        handleImport() {
            this.showExcelDialog = true
        }
    },
    mounted() {

    },
    components: {
        importFiel,
        assigningRoles
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

    .employee {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 25px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;

        .left {
            width: 20%;
            box-sizing: border-box;
            padding: 10px;
            border-right: 1px solid #ccc;

            .el-tree {
                margin-top: 20px;
            }
        }

        .right {
            width: 78%;
            box-sizing: border-box;

            .top {
                float: right;
                margin-bottom: 20px;
                margin-top: 20px;
            }

            .el-pagination {
                float: right;
                margin: 10px 0;
            }

            .word {
                display: inline-block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 1px solid #ccc;
                text-align: center;
                line-height: 30px;
                background-color: #04c9be;
                color: #fff;
            }
        }
    }
}
</style>


<!-- ### 作用域插槽

定义slot插槽的同时，是可以传值的，给slot上绑定数据，将来使用组件时使用

- 1.给slot标签，以添加属性的方式传值
- 2.所有被添加的属性，都会被收集到一个对象中
- 3.在template中 通过#name值="obj" 接收  ，添加的属性就给了obj -->