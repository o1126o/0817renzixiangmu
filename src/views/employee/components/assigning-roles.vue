<template>
    <div>
        <el-dialog title="分配角色" :visible="roleDialog" @close="handleDel">
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in roleCheckList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
            <p class="foot">
                <el-button size="mini" type="primary" @click="Submit">确定</el-button>
                <el-button size="mini" @click="handleDel">取消</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
import { getEnabledRoles, getEmployeeDetail, assignRole } from "@/api/employee"
export default {
    props: {
        roleDialog: {
            type: Boolean,
            default: false
        },
        roleId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            checkList: [],
            roleCheckList: []
        }
    },
    methods: {
        // 角色数据
        async queryRoles() {
            let res = await getEnabledRoles()
            this.roleCheckList = res
            let ress = await getEmployeeDetail(this.roleId)
            console.log(ress);
            this.checkList = ress.roleIds
        },
        // // 角色选中的
        // async queryIdList() {
        // },
        handleDel() {
            this.checkList = []
            this.$emit('update:roleDialog', false)
        },
        // 确定
        async Submit() {
            await assignRole({
                id: this.roleId,
                roleIds: this.checkList
            })
            this.$message.success('分配角色成功')
            this.roleDialog = false
        }
    },
    created() {
        // this.queryRoles()
    },
    mounted() {

    },
    components: {

    },
    computed: {

    },
    watch: {

    },
}
</script>

<style lang='scss' scoped>
.foot {
    text-align: center;
    margin-top: 30px;
}
</style>
