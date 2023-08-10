import { ArticleDto } from '../article'
import { ConfirmationDto } from '../confirmation'
import { GoalDto } from '../goal'
import { UserDto } from '../user'

const OG_TYPES = ['website', 'profile', 'article'] as const

export type OGType = (typeof OG_TYPES)[number]

export interface PossiblePageError {
  readonly message?: {
    statusCode: number
  }
}

export interface HashtagDto {
  name: string
  views: number
}

export interface SearchPageDto {
  readonly q: string
  readonly hashtags: HashtagDto[]
  readonly goals: GoalDto[]
  readonly users: UserDto[]
}

export type RatingPageDto = UserDto[]

export interface FollowingPageDto {
  readonly following: UserDto[]
}

export interface UserPageDto extends UserDto {
  readonly following: boolean
  readonly goals: GoalDto[]
  readonly confirmations: ConfirmationDto[]
}

export interface BlogPageDto {
  articles: ArticleDto[]
}

export interface ArticlePageDto extends ArticleDto {
  readonly more: ArticleDto[]
}
