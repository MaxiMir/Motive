import { UserCharacteristicDto } from './characteristic'

export interface UserBaseDto {
  id: number
  nickname: string
  name: string
  avatar?: string | null
  email?: string | null
  sub?: string | null
  provider?: string
}

export type CreateUserDto = Omit<UserBaseDto, 'id' | 'nickname'>

export interface UserDto extends UserBaseDto {
  characteristic: UserCharacteristicDto
}

export interface ClientDto {
  id: number
  nickname: string
  name: string
  avatar: string | null
}
