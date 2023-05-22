export interface ArticleDto {
  readonly id: number
  readonly pathname: string
  readonly date: string
  readonly image: string
  readonly views: number
  readonly sharesCount: number
  readonly likeCount: number
  readonly bookmarkedCount: number
  readonly title: string
  readonly description: string
  readonly header: string
  readonly motto: string
  readonly tag: string
  readonly content: string
}
