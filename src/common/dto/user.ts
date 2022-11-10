import { Device } from '@helpers/dom'
import { UserCharacteristicDto } from './characteristic'

export interface UserBaseDto {
  readonly id: number
  readonly name: string
  readonly nickname: string
  readonly avatar?: string | null
  readonly email?: string | null
  readonly sub?: string | null
  readonly provider?: string
  readonly online?: boolean | null
  readonly lastSeen?: string | null
  readonly device?: Device | null
}

export type CreateUserDto = Omit<UserBaseDto, 'id' | 'nickname'>

export interface UpdateUserDto {
  name: UserBaseDto['name']
  nickname: UserBaseDto['nickname']
  avatar?: File | string | null
}

export interface UserDto extends UserBaseDto {
  readonly characteristic: UserCharacteristicDto
}

export interface ClientDto {
  readonly id: number
  readonly nickname: string
  readonly name: string
  readonly avatar: string | null
}