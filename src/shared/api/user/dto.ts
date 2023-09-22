import { ScoreDto, SphereDto } from '../characteristic'

export type UserCharacteristicDto = Readonly<{ [k in ScoreDto | SphereDto]: number }>

export interface UserBaseDto {
  readonly id: number
  readonly name: string
  readonly nickname: string
  readonly avatar?: string | null
  readonly email?: string | null
  readonly authId?: string
  readonly online?: boolean | null
  readonly lastSeen?: string | null
  readonly device?: string | null
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

export type UpdateUserDto = Pick<
  UserBaseDto,
  'name' | 'nickname' | 'motto' | 'location' | 'bio' | 'links' | 'avatar'
>

export interface UpdateCharacteristicDto {
  name: SphereDto
  value: number
}

export interface UserDto extends UserBaseDto {
  readonly characteristic: UserCharacteristicDto
}
