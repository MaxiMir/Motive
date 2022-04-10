export default {
  en: {
    helpful: 'Marked as very helpful',
    getArea(count: number): string {
      return ` along with ${count} other people`
    },
    getLike(like?: boolean): string {
      return !like ? 'Like' : 'Unlike'
    },
    getMark(mark?: boolean): string {
      return `${!mark ? 'Mark' : 'Unmark'} as very helpful`
    },
    getUserMessage(name: string): string {
      return `You have increased ${name} support points`
    },
    goalMessage: "You have increased goal's support points",
  },
  ru: {
    helpful: 'Отмечено как полезное',
    getArea(count: number): string {
      return ` вместе с ${count} другими людьми`
    },
    getLike(like?: boolean): string {
      return !like ? 'Лайк' : 'Убрать лайк'
    },
    getMark(mark?: boolean): string {
      return !mark ? 'Отметить как полезное' : 'Убрать отметку о полезности'
    },
    getUserMessage(name: string): string {
      return `Вы увеличили очки поддержки ${name}`
    },
    goalMessage: 'Вы увеличили очки поддержки для цели',
  },
}
