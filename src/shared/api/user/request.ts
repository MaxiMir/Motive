import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { CreateUserDto, UpdateUserDto, UserBaseDto } from './model'

export const getUsers = (filter: Filter): Promise<UserBaseDto[]> => {
  const params = getFilterParams(filter)

  return fetcher.get('/users', { params })
}

export const createUser = (dto: CreateUserDto): Promise<UserBaseDto> => {
  return fetcher.post('/users', dto)
}

export const updateUser = (id: number, dto: UpdateUserDto): Promise<UserBaseDto> => {
  return fetcher.put(`/users/${id}`, dto)
}

export const updateAvatar = (id: number, formData: FormData): Promise<UserBaseDto> => {
  return fetcher.patch(`/users/${id}/avatar`, formData)
}

export const deleteAvatar = (id: number): Promise<UserBaseDto> => {
  return fetcher.delete(`/users/${id}/avatar`)
}
