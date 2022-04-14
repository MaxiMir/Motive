import { DayCharacteristicName } from 'dto'

export default {
  en: {
    getTitle(active: boolean, name: string): string {
      return `${active ? 'Decrease' : 'Increase'} ${name} points`
    },
  },
  ru: {
    getTitle(active: boolean, name: DayCharacteristicName): string {
      const characteristic = name === 'motivation' ? 'мотивации' : 'креативности'

      return `${active ? 'Уменьшить' : 'Увеличить'} очки ${characteristic}`
    },
  },
}
