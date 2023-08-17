import Layout from "@/layout"

export default {
    path: "/employee",
    name: 'employee',
    component: Layout,
    children: [
        {
            path: '',
            name: 'employee',
            component: () => import("@/views/employee/index"),
            meta: {
                icon: "el-icon-user",
                title: "员工"
            }
        },
        {
            path: 'detail/:id?',
            name: 'detail',
            hidden: true,
            component: () => import("@/views/employee/detail"),
        }
    ]
}