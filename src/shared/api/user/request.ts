import { fetcher } from '../fetcher'
import { Filter, getFilterParams } from '../filter'
import { CreateUserDto, UpdateCharacteristicDto, UpdateUserDto, UserBaseDto } from './dto'

export function getUsers(filter: Filter): Promise<UserBaseDto[]> {
  const params = getFilterParams(filter)

  return fetcher.get('/users', { params })
}

export function createUser(dto: CreateUserDto): Promise<UserBaseDto> {
  return fetcher.post('/users', dto)
}

export function updateUser(id: number, dto: UpdateUserDto): Promise<UserBaseDto> {
  return fetcher.put(`/users/${id}`, dto)
}

export function updateAvatar(id: number, formData: FormData): Promise<UserBaseDto> {
  return fetcher.patch(`/users/${id}/avatar`, formData)
}

export function updateCharacteristic(id: number, dto: UpdateCharacteristicDto): Promise<void> {
  return fetcher.patch(`/users/${id}/characteristic`, dto)
}

export function deleteAvatar(id: number): Promise<UserBaseDto> {
  return fetcher.delete(`/users/${id}/avatar`)
}
