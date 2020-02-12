import AccountApi from './AccountApi'
import MD5Utils from '../../../utils/security/MD5Utils'

function getEncryptPassword(password) {
  return MD5Utils.encrypt(MD5Utils.encrypt(password))
}
class AccountSysUserApi extends AccountApi {
  constructor() {
    super('sysUser')
  }
  add(data) {
    return super.add({ ...data, password: getEncryptPassword(data.password) })
  }
  // 登录
  login({ account, password }) {
    // return super.customize_post('/login', { account, password: getEncryptPassword(password) })
    return Promise.resolve({"code":"1","message":"操作成功","data":{"id":"19","companyId":"0","account":"yulushen","name":"yulushen","mobile":null,"email":null,"birthday":null,"sex":null,"deptId":"1","deptIds":"1,14","deptName":"智慧机场","status":"1","empCode":null,"titleCode":null,"titleName":null,"lastLoginTime":"2020-01-09 10:27:50","createTime":"2019-11-25 18:23:00","createBy":null,"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5dWx1c2hlbiIsImNvbXBhbnlJZCI6MCwiaWQiOjE5LCJleHAiOjE1ODE0OTYwMzYsImlhdCI6MTU4MTQwOTYzNiwianRpIjoiMTk1MTVkOGUtYjEyMy00MGExLTg5OTctYTRkYjhjOGQxMjQ0IiwidXNlcm5hbWUiOiJ5dWx1c2hlbiJ9._cup8dpag3tfXLi98s2VIOgVT75iIcG0iIzG-Lr8vFg","roles":["1"],"airportCode":"YIH"}}
    )
  }
  // 获取当前登录用户信息
  info() {
    return super.customize_get('/info')
  }
  getMenu() {
    return Promise.resolve({"code":"1","message":"操作成功"})
    // return super.customize_get('/getMenuNew')
  }
  logout() {
    return super.customize_post('/logout')
  }
  // 重置密码
  resetPassword(data) {
    return super.customize_put('/updatePassword', { ...data, password: getEncryptPassword(data.password) })
  }
  // 修改密码
  updatePassword({ oldPassword, newPassword }) {
    return super.customize_put('/updateLoginUserPassword', { oldPassword: getEncryptPassword(oldPassword), newPassword: getEncryptPassword(newPassword) })
  }
}

export default new AccountSysUserApi()
