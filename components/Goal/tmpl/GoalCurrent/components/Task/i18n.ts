export default {
  en: {
    getMessage(name: string, rest: number): string {
      return !rest ? `Well done, ${name}! All tasks are completed` : `Do it, ${name}! Remains to be done: ${rest}`
    },
    undo: 'Undo',
  },
  ru: {
    getMessage(name: string, rest: number): string {
      return !rest
        ? `Отличная работа, ${name}! Все задания выполнены`
        : `Сделайте это, ${name}! Осталось: ${rest} задач`
    },
    undo: 'Отменить',
  },
}
