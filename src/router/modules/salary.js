import Layout from "@/layout"

export default {
    path: "/salary",
    name: "salary",
    component: Layout,
    children: [
        {
            path: "",
            name: "salary",
            component: () => import("@/views/salary/index"),
            meta: {
                icon: "link",
                title: "工资"
            }
        }
    ]
}