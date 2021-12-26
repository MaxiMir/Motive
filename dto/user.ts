import { UserCharacteristicDto } from './characteristic'

export interface UserBaseDto {
  id: number
  nickname: string
  name: string
  avatar: string
}

export interface UserDto extends UserBaseDto {
  characteristic: UserCharacteristicDto
}
