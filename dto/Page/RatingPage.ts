import { User, Characteristic } from 'dto'

export interface RatingPage {
  motivation: RatingList
  creativity: RatingList
  support: RatingList
}

type RatingList = {
  list: User[]
  type: Characteristic
}
