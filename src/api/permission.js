import request from "@/utils/request"

// 获取所有权限
export function getPermissionList() {
    return request({
        url: '/sys/permission',
    })
}


// https://heimahr.itheima.net/api/sys/role/1
export function queryPer(id) {
    return request({
        url: `/sys/role/${id}`
    })
}

/* 给角色分配权限  /sys/permission */
export function updatePer(data) {
    return request({
        url: `/sys/role/assignPrem`,
        method: 'PUT',
        data
    })
}

// 根据id删除权限点
export function deletePer(id) {
    return request({
        url: `/sys/permission/${id}`,
        method: 'DELETE'
    })
}

// 添加权限点
export function addPermissionFrom(data) {
    return request({
        url: `/sys/permission`,
        method: 'POST',
        data
    })
}

// 根据id获取权限点详情
export function queryFrom(id) {
    return request({
        url: `/sys/permission/${id}`,
        method: 'GET'
    })
}

// 根据id更新权限点详情
export function updateFrom(data) {
    return request({
        url: `/sys/permission/${data.id}`,
        method: 'PUT',
        data
    })
}