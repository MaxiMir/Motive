import { UserCharacteristicDto } from './characteristic'

export interface UserBaseDto {
  readonly id: number
  readonly nickname: string
  readonly name: string
  readonly avatar?: string | null
  readonly email?: string | null
  readonly sub?: string | null
  readonly provider?: string
}

export type CreateUserDto = Readonly<Omit<UserBaseDto, 'id' | 'nickname'>>

export interface UserDto extends UserBaseDto {
  readonly characteristic: UserCharacteristicDto
}

export interface ClientDto {
  readonly id: number
  readonly nickname: string
  readonly name: string
  readonly avatar: string | null
}
