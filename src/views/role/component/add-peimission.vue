<template>
    <div>
        <el-dialog title="分配权限" :visible="permissionVisible" @close="$emit('update:permissionVisible', false)">
            <el-tree :data="data" :props="defaultProps" show-checkbox default-expand-all node-key="id" ref="permRef"
                :default-checked-keys="permIds" @check="checkHandle">
            </el-tree>
            <p class="foot">
                <el-button size="mini" type="primary" @click="handleOk">确定</el-button>
                <el-button size="mini" @click="$emit('update:permissionVisible', false)">取消</el-button>
            </p>
        </el-dialog>
    </div>
</template>

<script>
import { getPermissionList, updatePer, queryPer } from "@/api/permission"
import { transListToTreeData } from "@/utils/index"
export default {
    props: {
        permissionVisible: {
            type: Boolean,
            default: false
        },
        currendId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            data: [],
            permIds: []
        }
    },
    methods: {
        checkHandle() {
            this.permIds = this.$refs.permRef.getCheckedKeys()
            console.log(this.permIds);
        },
        // 获取当前角色的权限
        async queryPermission() {
            let res = await getPermissionList()
            this.data = transListToTreeData(res, 0)
            this.$emit('update:permissionVisible', true);
            let ress = await queryPer(this.currendId)
            this.$nextTick(() => {
                this.$refs.permRef.setCheckedKeys(ress.permIds)
            })
        },
        // handleOk 角色分配权限
        async handleOk() {
            await updatePer({ id: this.currendId, permIds: this.permIds })
            this.$message.success('角色添加权限点成功')
            this.$emit('update:permissionVisible', false);
            this.$emit('updateRole');
        }
    },
    created() {
    }
}
</script>

<style lang='scss' scoped>
.foot {
    text-align: center;
    margin-top: 20px;
}
</style>
