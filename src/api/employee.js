import request from "@/utils/request"

/** *
 * 获取员工数据
 * **/
export function getEmployeeList(params) {
    return request({
        url: '/sys/user',
        params // 查询参数
    })
}

// 新增员工
export function addEmployee(data) {
    return request({
        url: '/sys/user',
        method: 'post',
        data
    })
}


//根据id查找员工详情
export function getEmployeeDetail(id) {
    return request({
        url: `/sys/user/${id}`
    })
}

//根据id修改员工详情
export function setEmployeeDetail(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

//根据id删除员工详情
export function delEmployeeDetail(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}


// 导出员工的excel
export function exportEmployee() {
    return request({
        url: '/sys/user/export',
        responseType: 'blob', // 默认值
    })
}

// 导出员工的模板
export function templateEmployee() {
    return request({
        url: 'sys/user/import/template',
        responseType: 'blob', // 默认值
    })
}

// 导入员工的 excel sys/user/import
export function importEmployee(data) {
    return request({
        url: 'sys/user/import',
        method: 'POST',
        data   //formData类型  因为要上传文件
    })
}


//获取角色列表   /sys/role/list/enabled
export function getEnabledRoles() {
    return request({
        url: `/sys/role/list/enabled`
    })
}


// 分配角色
export function assignRole(data) {
    return request({
        url: `/sys/user/assignRoles`,
        method: "PUT",
        data
    })
}