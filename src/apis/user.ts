import request from '@/apis/config/request'
import { Api } from './type'
import { IRole } from './role'

export interface Profile {
  id: number
  username: string
  email: string
  mobile: string
  isSuper: boolean
  status: boolean
  avatar: string
  description: string
  roles: IRole[]
  roleIds?: number[] // 修改用户的时候，后端接受只要id
}

export interface IUserLoginData {
  username: string
  password: string
}

export interface ILoginResponseData {
  token: string
}
// 登录接口
export const login = (
  data: IUserLoginData
): Promise<Api<ILoginResponseData>> => {
  return request.post('/auth/login', data)
}

export interface IUsers {
  users: Profile[]
  total: number
}
// 查询参数
export interface IUserQuery {
  pageNum?: number
  pageSize?: number
  mobile?: string
  status?: boolean
  username?: string
}

// 获取用户列表的接口
export const getUsers = (params: IUserQuery): Promise<Api<IUsers>> => {
  const {
    pageNum = 0,
    pageSize = 10,
    username = '',
    status,
    mobile = ''
  } = params
  return request.get('/user', {
    params: {
      pageNum,
      pageSize,
      username,
      status,
      mobile
    }
  })
}

// 删除用户
export const removeUser = (id: number): Promise<Api> => {
  return request.delete(`/user/${id}`)
}
// 添加用户
export const addUser = (data: Profile): Promise<Api> => {
  return request.post('/user', data)
}
// export const addUser = (data: Profile): Promise<Api> => {
//   return request.post('/auth/register', data)
// }
// 编辑用户
export const updateUser = (id: number, data: Profile): Promise<Api> => {
  return request.put(`/user/${id}`, data)
}

export const getUserInfo = (): Promise<Api<Profile>> => {
  return request.post('/auth/info')
}
