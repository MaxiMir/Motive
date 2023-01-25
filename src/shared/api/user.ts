import { Device } from './device'
import { GoalDto } from './goal'
import { MemberDto } from './member'
import { ConfirmationDto } from './confirmation'
import { MainCharacteristicName, SecondCharacteristicName } from './characteristic'

export type UserCharacteristicName = MainCharacteristicName | SecondCharacteristicName

export type UserCharacteristicDto = Readonly<{
  [k in UserCharacteristicName]: number
}>

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

export interface ExternalLink {
  href: string
  title?: string
}

export type CreateUserDto = Omit<UserBaseDto, 'id' | 'nickname'>

export interface UpdateUserDto {
  name: UserBaseDto['name']
  nickname: UserBaseDto['nickname']
  avatar?: File | string | null
  motto?: string
  location?: string
  bio?: string
  links?: ExternalLink[]
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

export interface UserPageDto extends UserDto {
  following: boolean
  goals: GoalDto[]
  membership: MemberDto[]
  clientMembership: MemberDto[]
  confirmations: ConfirmationDto[]
}
