export default {
  en: {
    copy: 'Copied',
    error: 'Something went wrong...',
    motivation: 'motivation',
    creativity: 'creativity',
    support: 'support',
    completed: 'completed',
    abandoned: 'abandoned',
    followers: 'followers',
    undo: 'Undo',
    share: 'Share',
    report: 'Report',
    leave: 'Leave',
    remove: 'Remove',
    format: 'MM/dd/yyyy',
    agoText: 'ago',
    getLimitPhotosError(limit: number): string {
      return `You cannot add more than ${limit} photos`
    },
  },
  ru: {
    copy: 'Скопировано',
    error: 'Что-то пошло не так...',
    motivation: 'мотивация',
    creativity: 'креативность',
    support: 'поддержка',
    completed: 'завершённые',
    abandoned: 'заброшенные',
    followers: 'подписчики',
    undo: 'Отменить',
    share: 'Поделиться',
    report: 'Пожаловаться',
    leave: 'Покинуть',
    remove: 'Удалить',
    format: 'dd/MM/yyyy',
    agoText: 'назад',
    getLimitPhotosError(limit: number): string {
      return `Вы не можете добавить больше ${limit} фото`
    },
  },
}
