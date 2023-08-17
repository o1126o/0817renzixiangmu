<template>
    <div class="box">
        <div class="department">
            <el-tree :data="data" :props="defaultProps" :default-expand-all="true">
                <template slot-scope="{ node, data }">
                    <el-row type="flex" class="row-bg" align="center" justify="space-between">
                        <el-col>
                            {{ data.name }}
                        </el-col>
                        <el-col :span="6" class="right-box">
                            <span class="row-con">{{ data.managerName }}</span>
                            <!-- $event 是点击下拉菜单传出来的类型 add/edit/del -->
                            <el-dropdown @command="operateDept($event, data.id)">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                                    <el-dropdown-item command="remove">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </template>
            </el-tree>

            <!-- 对话框 -->
            <!-- .sync 修饰符可以监听子组件传过来的 update:属性名 的事件，将父组件的值进行修改 -->
            <addDep :showDialog.sync="showDialog" @updateDepartments="getTerr" :currentNodeId="currentNodeId" ref="adddep">
            </addDep>
        </div>
    </div>
</template>

<script>
import { getDepartment, delDepartment } from "@/api/table";
import { transListToTreeData } from "@/utils/index"
import addDep from "./component/add-dep.vue"
// import editDep from "./component/edit-dep.vue"
export default {
    data() {
        return {
            data: [
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            showDialog: false,  // 添加弹框
            currentNodeId: null,   // 添加记录父级id
        };
    },
    methods: {
        async getTerr() {
            let res = await getDepartment()
            this.data = transListToTreeData(res, 0)
        },
        operateDept(type, id) {
            if (type === 'add') {
                this.currentNodeId = id
                console.log(this.currentNodeId);
                this.showDialog = true
            } else if (type === 'edit') {
                this.showDialog = true
                this.currentNodeId = id
                // 更新props是异步的，通过ref获取组件实例，调用子组件方法  同步方法
                this.$nextTick(() => {
                    this.$refs.adddep.getDepartmentEdit()
                })
            } else if (type === 'remove') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delDepartment(id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getTerr()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

        },
    },
    created() {
        this.getTerr()
    },
    mounted() {

    },
    components: {
        addDep,
        // editDep
    },
    computed: {

    },
    watch: {

    },
}
</script>

<style lang='scss' scoped>
.row-bg {
    width: 100%;
}

.row-con {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
}

::v-deep .el-tree-node__content {
    height: 40px !important;
}

.department {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px 100px;
    font-size: 14px;
}

.box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
}

.right-box {
    width: 200px;
}
</style>
