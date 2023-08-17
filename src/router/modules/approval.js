import Layout from '@/layout'
export default {
    path: '/approval',
    name: "approval",
    component: Layout,
    children: [
        {
            path: "",
            name: "approval",
            component: () => import('@/views/approval/index'),
            meta: {
                icon: "el-icon-aim",
                title: '审批'
            }
        }
    ]
}