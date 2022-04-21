export default {
  en: {
    getMessage(name: string, rest: number): string {
      return !rest ? `Well done, ${name}!` : `Do it! Remains to be done: ${rest}`
    },
    undo: 'Undo',
  },
  ru: {
    getMessage(name: string, rest: number): string {
      return !rest ? `Отличная работа, ${name}!` : `Сделай это! Осталось: ${rest}`
    },
    undo: 'Отменить',
  },
}
