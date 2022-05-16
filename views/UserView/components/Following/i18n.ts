export default {
  en: {
    getTitle(following: boolean): string {
      return following ? 'Unfollow' : 'Follow'
    },
    getMessage(add: boolean): string {
      return add ? 'Following added' : 'Following removed'
    },
  },
  ru: {
    getTitle(following: boolean): string {
      return following ? 'Отписаться' : 'Подписаться'
    },
    getMessage(add: boolean): string {
      return add ? 'Подписка добавлена' : 'Подписка удалена'
    },
  },
}
