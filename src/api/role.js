import request from "@/utils/request"

export function getRole(params) {
    return request({
        url: '/sys/role',
        params
    })
}


//  更新角色信息
export function updateRole(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'PUT',
        data // 查询参数
    })
}

// 添加角色
export function addRole(data) {
    return request({
        url: '/sys/role',
        method: 'POST',
        data
    })
}

// 删除角色
export function delRole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'DELETE'
    })
}



