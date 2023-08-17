<template>
    <div>
        <el-dialog :title="getTile" :visible="showDialog" @close="close">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="2-10个字符" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="部门编码" prop="code">
                    <el-input v-model="ruleForm.code" placeholder="2-10个字符" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人" prop="managerId">
                    <el-select v-model="ruleForm.managerId" placeholder="请选择负责人" style="width: 80%;">
                        <el-option v-for="(  item, index  ) in   mangList  " :key="item.id" :label="item.username"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                    <el-input type="textarea" v-model="ruleForm.introduce" placeholder="1-100个字符"
                        style="width: 80%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from "@/api/table";
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        currentNodeId: {
            type: Number,
            default: null
        }
    },
    data() {
        const nameValidate = async (rule, value, callback) => {
            let res = await getDepartment()
            if (this.ruleForm.id) {
                console.log(8888);
                res = res.filter(item => item.id !== this.ruleForm.id)
            }
            if (res.some(item => item.name === value)) {
                callback(new Error("部门中已有该名称了"))
            } else {
                callback()
            }

        }
        const codeValidate = async (rule, value, callback) => {
            let res = await getDepartment()
            if (this.ruleForm.id) {
                console.log(8888);
                res = res.filter(item => item.id !== this.ruleForm.id)
            }
            if (res.some(item => item.code === value)) {
                callback(new Error("部门中已有该名称了"))
            } else {
                callback()
            }
        }
        return {
            mangList: [],
            ruleForm: {
                name: "",
                code: "",
                managerId: "",
                introduce: ""
            },
            rules: {
                name: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' },
                    { validator: nameValidate, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' },
                    { validator: codeValidate, trigger: 'blur' }
                ],
                managerId: [
                    { required: true, message: '部门负责人不能为空', trigger: 'change' }
                ],
                introduce: [
                    { required: true, message: '部门介绍不能为空', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1到 100 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        async getMang() {
            let res = await getManagerList()
            this.mangList = res
        },
        close() {
            this.$refs.ruleForm.resetFields()
            this.$emit('update:showDialog', false)
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let msg = '新增'
                    if (this.ruleForm.id) {
                        msg = '更新'
                        await updateDepartment(this.ruleForm)
                    } else {
                        await addDepartment({ ...this.ruleForm, pid: this.currentNodeId })
                    }
                    await this.$emit('updateDepartments')
                    this.$message.success(`${msg}部门成功`)
                    this.close()
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 编辑
        async getDepartmentEdit() {
            let res = await getDepartmentDetail(this.currentNodeId)
            this.ruleForm = res
        }
    },
    created() {
        this.getMang()
    },
    mounted() {
    },
    computed: {
        getTile() {
            return this.ruleForm.id ? '编辑' : '添加'
        }
    }

}
</script>

<style lang='scss' scoped></style>
