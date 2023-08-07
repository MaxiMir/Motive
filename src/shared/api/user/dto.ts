import { Device } from '../device'
import { OnlineIndexName } from '../skills'

export type UserCharacteristicDto = Readonly<{ [k in OnlineIndexName]: number }>

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
  readonly motto?: string
  readonly location?: string
  readonly bio?: string
  readonly registered?: string
  readonly links?: ExternalLink[]
}

interface ExternalLink {
  readonly href: string
  readonly host: string
  readonly title?: string
}

export type CreateUserDto = Omit<UserBaseDto, 'id' | 'nickname'>

export interface UpdateUserDto {
  readonly name: UserBaseDto['name']
  readonly nickname: UserBaseDto['nickname']
  readonly avatar?: File | string | null
  readonly motto?: string
  readonly location?: string
  readonly bio?: string
  readonly links?: ExternalLink[]
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
