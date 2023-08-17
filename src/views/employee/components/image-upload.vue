<template>
    <!-- 
    (自动上传)action	必选参数，上传的地址	
    string----当前项目 -手动上传
    show-file-list	是否显示已上传文件列表	boolean   false 不展示列表
    before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	
    function(file)
    http-request  覆盖默认的上传行为，可以自定义上传的实现
    如果边框样式消失  list-type="picture-card"
     -->
    <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload"
        :http-request="uploadImage" list-type="picture-card">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import COS from "cos-js-sdk-v5"
export default {
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            const isJPG = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
        },
        // 选择图片上传
        uploadImage(params) {
            console.log(params.file);
            // 完成cos对象的初始化
            const cos = new COS({
                SecretId: 'AKIDsfhZFhw284pQtAGA1lJ7lDaotqbCeu02',
                SecretKey: '0qYAg1990hEZhojTEpHaheP6i9OUNH3e'
            })
            // 配置cos
            cos.putObject({
                Bucket: 'bj-2210c-1320041715', // 存储桶名称
                Region: 'ap-nanjing', // 地域名称
                Key: params.file.name, // 文件名称
                StorageClass: 'STANDARD', // 固定值
                Body: params.file // 文件对象
            }, (err, data) => {
                if (data.statusCode === 200 && data.Location) {
                    // 拿到腾讯云返回的地址  data.Location
                    // 通过input自定义事件将地址传出
                    this.$emit('input', 'http://' + data.Location)
                } else {
                    this.$message.error(err.Message) // 上传失败提示消息
                }
            })
        }
    },
}
</script>

<style lang='scss' scoped>
img {
    width: 146px;
    height: 146px;
}
</style>
