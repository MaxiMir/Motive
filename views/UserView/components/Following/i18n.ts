export default {
  en: {
    getName(following: boolean): string {
      return following ? 'Unfollow' : 'Follow'
    },
    getMessage(add: boolean): string {
      return add ? 'Following added' : 'Following removed'
    },
  },
  ru: {
    getName(following: boolean): string {
      return following ? 'Отписаться' : 'Подписаться'
    },
    getMessage(add: boolean): string {
      return add ? 'Подписка добавлена' : 'Подписка удалена'
    },
  },
  uk: {
    getName(following: boolean): string {
      return following ? 'Відписатися' : 'Підписатися'
    },
    getMessage(add: boolean): string {
      return add ? 'Підписка додана' : 'Підписка видалена'
    },
  },
}
