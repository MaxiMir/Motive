import { DayCharacteristicName } from 'dto'

export default {
  en: {
    getTitle(active: boolean, name: string): string {
      return `${active ? 'Decrease' : 'Increase'} ${name} points`
    },
    getMessage(name: DayCharacteristicName): string {
      return `You have increased day's ${name} points`
    },
  },
  ru: {
    getTitle(active: boolean, name: DayCharacteristicName): string {
      const characteristic = name === 'motivation' ? 'мотивации' : 'креативности'

      return `${active ? 'Уменьшить' : 'Увеличить'} очки ${characteristic}`
    },
    getMessage(name: DayCharacteristicName): string {
      const characteristic = name === 'motivation' ? 'мотивации' : 'креативности'

      return `Вы увеличили очки ${characteristic}`
    },
  },
}
