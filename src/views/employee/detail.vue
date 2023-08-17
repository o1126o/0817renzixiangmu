<template>
  <div class="boxs">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="ruleForm.workNumber" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="ruleForm.mobile" v-if="ids" :disabled="true"></el-input>
        <el-input v-model="ruleForm.mobile" v-else></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <selectTree v-model="ruleForm.departmentId"></selectTree>
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="ruleForm.formOfEmployment">
          <el-option label="正式" :value="1"></el-option>
          <el-option label="非正式" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间" required prop="timeOfEntry">
        <el-date-picker type="date" placeholder="选择入职日期" v-model="ruleForm.timeOfEntry" style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="转正时间" required prop="correctionTime">
        <el-date-picker type="date" placeholder="选择转正日期" v-model="ruleForm.correctionTime" style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="员工头像" prop="staffPhoto">
        <ImageUpload v-model="ruleForm.staffPhoto" />
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">{{ ids ? '编辑' : '新增' }}</el-button> -->
        <el-button type="primary" @click="submitForm">{{ ids ? '编辑' : '新增' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addEmployee, getEmployeeDetail, setEmployeeDetail } from "@/api/employee"
import selectTree from "./components/select-tree.vue"
import ImageUpload from "./components/image-upload.vue"
export default {
  data() {
    const correctionTimeValidate = (rule, value, callback) => {
      if (this.ruleForm.timeOfEntry) {
        if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
          callback(new Error('转正时间不能小于入职时间'))
          return
        }
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '', // 用户名
        mobile: '', // 手机号
        workNumber: '', // 工号
        formOfEmployment: '', // 聘用形式
        correctionTime: '', // 转正时间
        departmentId: null, // id 部门
        staffPhoto: '', // 头像
        timeOfEntry: '' // 入职时间
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请选择聘用形式', trigger: 'change' }
        ],
        timeOfEntry: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        correctionTime: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' },
          { validator: correctionTimeValidate }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
      },

      ids: this.$route.params.id
    }
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate(async valid => {
    //     if (valid) {
    //       if (ids) {
    //         this.$message.success('编辑成功')
    //         this.$router.push('/employee')
    //       } else {
    //         await addEmployee(this.ruleForm)
    //         this.$message.success('添加成功')
    //         this.$router.push('/employee')
    //       }
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    submitForm() {
      if (this.ids) {
        console.log({ ...this.ruleForm, id: this.ids });
        setEmployeeDetail({ ...this.ruleForm, id: this.ids })
        this.$message.success('编辑成功')
        this.$router.push('/employee')
      } else {
        addEmployee(this.ruleForm)
        this.$message.success('添加成功')
        this.$router.push('/employee')
      }
    },
    // 获取用户详情
    async queryEmployeeDetails() {
      let res = await getEmployeeDetail(this.$route.params.id)
      this.ruleForm = res
    }
  },
  created() {
    this.$route.params.id && this.queryEmployeeDetails()
  },
  mounted() {

  },
  components: {
    selectTree,
    ImageUpload
  },
  computed: {

  },
  watch: {

  },
}
</script>

<style lang='scss' scoped>
.boxs {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  padding: 50px;

  .el-form {
    width: 400px;
  }
}


</style>
