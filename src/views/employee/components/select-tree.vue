<template>
    <!-- 
        员工详情-封装部门级联组件
        cascader级联组件特性
        options 树形结构的数据源
        props 设置数据源中的字段 label value
        separator 选项分隔符 默认是 /
        步骤:
        1.封装 级联组件(options,props,separator )---初始化时获取数据-转换树形结构
        2.父组件中引入
        3.级联组件 ---双向绑定(v-model双向绑定----触发input事件，接收value属性) 
    -->
    <el-cascader :value="value" :options="options" :props="defaultProps" @change="handleChange" sepaeator="-"></el-cascader>
</template>

<script>
import { getDepartment } from "@/api/table.js";
import { transListToTreeData } from "@/utils/index.js"
export default {
    props: {
        value: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            options: [],
            defaultProps: {
                label: 'name',
                value: 'id'
            },
        }
    },
    methods: {
        async getTerr() {
            let res = await getDepartment()
            this.options = transListToTreeData(res, 0)
        },
        // change当选中节点变化时触发	参数：选中节点的值
        handleChange(list) {
            console.log(list, "list")
            if (list.length > 0) {
                this.$emit('input', list[list.length - 1])
            } else {
                this.$emit('input', null)
            }

        }
    },
    created() {
        this.getTerr()
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
