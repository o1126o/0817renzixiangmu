<template>
    <div>
        <el-dialog title="新增角色" :visible="dialogFormVisible" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="启用" prop="state">
                    <el-switch v-model="ruleForm.state" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getRole, addRole } from "@/api/role"
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const nameValidate = async (rule, value, callback) => {
            let res = await getRole()
            if (res.rows.some(item => item.name === value)) {
                callback(new Error("已有该角色了"))
            } else {
                callback()
            }
        }
        return {
            ruleForm: {
                name: '',
                state: '',
                description: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { validator: nameValidate, trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        // 关闭
        close() {
            this.$refs.ruleForm.resetFields();
            this.$emit('update:dialogFormVisible', false)
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    await addRole({ ...this.ruleForm })
                    await this.$emit('updateRoles')
                    this.$message.success(`添加角色成功`)
                    this.close()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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

<style lang='scss' scoped>
::v-deep .el-dialog {
    width: 35%;
}
</style>
