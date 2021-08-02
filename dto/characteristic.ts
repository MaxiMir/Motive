export type Characteristic = 'motivation' | 'creativity' | 'support' | 'completed' | 'abandoned'

export type Characteristics = {
  [k in Characteristic]: number
}
