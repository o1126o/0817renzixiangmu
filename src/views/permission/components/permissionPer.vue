<template>
    <div>
        <el-dialog title="新增权限点" :visible="dialogVisible" @close="handleDel">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="code">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="开启">
                    <el-switch v-model="ruleForm.enVisible" active-value="1" inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleOk">确 定</el-button>
                <el-button @click="handleDel">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addPermissionFrom, updateFrom, queryFrom } from "@/api/permission"
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        ids: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            ruleForm: {
                enVisible: "",
                name: "",
                code: "",
                description: ""
            },
            rules: {
                name: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入权限标识', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleOk() {
            this.$refs.ruleForm.validate(async (isOk) => {
                if (isOk) {
                    if (!this.ruleForm.id) {
                        await addPermissionFrom({ ...this.ruleForm, pid: this.ids, type: 1 })
                        this.$message.success("添加权限点成功")
                    } else {
                        console.log("1234");
                        await updateFrom({ ...this.ruleForm, id: this.ids })
                        this.$message.success("更改权限点成功")
                    }
                    this.ruleForm = {}
                    this.$emit("priject")
                    this.$emit('update:dialogVisible', false)
                } else {
                    return false;
                }
            })
        },
        async queryDetails() {
            this.ruleForm = await queryFrom(this.ids)
        },
        // 关闭
        handleDel() {
            this.ruleForm = {}
            this.$emit('update:dialogVisible', false)
        }
    },
    created() {

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

<style lang='scss' scoped></style>
