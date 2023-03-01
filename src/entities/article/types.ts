export interface Meta {
  readonly title: string
  readonly description: string
  readonly header: string
  readonly image: string
  readonly motto: string
  readonly date: string
}

export interface Article {
  readonly meta: Meta
  readonly href: string
  readonly content: string
}
