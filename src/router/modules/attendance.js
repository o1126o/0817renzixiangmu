import Layout from "@/layout"

export default {
    path: '/attendance',
    name: "attendance",
    component: Layout,
    children: [
        {
            path: '',
            name: "attendance",
            component: () => import("@/views/attendance/index"),
            meta: {
                icon: "el-icon-date",
                title: '考勤'
            }
        }
    ]
}