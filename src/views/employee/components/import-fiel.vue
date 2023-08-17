<template>
    <div>
        <el-dialog title="员工导入" :visible="showExcelDialog" @close="$emit('update:showExcelDialog', false)" width="500px">
            <el-row type="flex" justify="center">
                <div class="div">
                    <!-- accept 属性  只接受什么类型的东西 -->
                    <input type="file" accept=".xlsx, .xls" class="excel-upload-input" ref="excel-upload-input"
                        @change="uploadChang">
                    <div class="box">
                        <i class="el-icon-upload" />
                        <el-button type="text" @click="handleDownLoad">下载导入模板</el-button>
                        <span>将文件拖到此处或 <el-button type="text" @click="handleUpload">点击上传</el-button></span>
                    </div>
                </div>
            </el-row>
            <el-row type="flex" justify="end">
                <el-button type="primary" size="mini" @click="$emit('update:showExcelDialog', false)">取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import { saveAs } from 'file-saver';
import { importEmployee, templateEmployee } from "@/api/employee"
export default {
    props: {
        showExcelDialog: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    methods: {
        // 下载模板
        handleDownLoad() {
            let res = templateEmployee()
            saveAs(res, '员工导入模板.xlsx')
        },
        // 上传文件
        handleUpload() {
            this.$refs['excel-upload-input'].click()
        },
        // uploadChang  监听改变
        async uploadChang(event) {
            console.log(event.target.files)
            const files = event.target.files
            if (files.length > 0) {
                // 大于0 说明又文件要上传
                const data = new FormData()
                data.append('file', files[0])
                await importEmployee(data)
                //    通知父组件
                this.$emit('uploadExcel')
                // 关闭模态框
                this.$emit('update:showExcelDialog', false)
            }
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
.div {
    display: flex;
    justify-content: center;
    width: 350px;
    height: 150px;
    box-sizing: border-box;
    margin-bottom: 10px;

    .excel-upload-input {
        display: none;
        z-index: -9999;
    }

    .box {
        width: 100%;
        height: 100%;
        border: 1px dashed #ccc;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        align-items: center;
        border-radius: 5px;

        i {
            font-size: 50px;
            color: #c0c4cc;
        }
    }
}
</style>
