import { Page, User, Characteristic } from 'dto'

type RatingType = 'motivation' | 'creativity' | 'support'

export type RatingPage = Page<
  {
    [k in RatingType]: {
      list: User[]
      type: Characteristic
    }
  }
>
