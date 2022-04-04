export default {
  en: {
    getTitle(following: boolean): string {
      return `${following ? 'Remove' : 'Add'} following`
    },
    getMessage(add: boolean): string {
      return add ? 'Following added' : 'Following removed'
    },
  },
  ru: {
    getTitle(following: boolean): string {
      return following ? 'Удалить подписку' : 'Подписаться'
    },
    getMessage(add: boolean): string {
      return add ? 'Подписка добавлена' : 'Подписка удалена'
    },
  },
}
