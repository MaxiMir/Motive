interface Content {
  readonly title: string
  readonly description: string
  readonly header: string
  readonly image: string
  readonly motto: string
  readonly date: string
  readonly tag: string
}

export interface ArticleBase {
  readonly data: Content
  readonly href: string
}

export interface Article extends ArticleBase {
  readonly content: string
  readonly more: ArticleBase[]
}
