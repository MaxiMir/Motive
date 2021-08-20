export default {
  INDEX: '/',
  TOP_OF_THE_DAY: '/top-of-the-day',
  SEARCH: '/search',
  RATING: '/rating',
  FAVORITES: '/favorites',
  FAVORITES_USERS: '/favorites/user',
  getFavoriteUserId(id: string): string {
    return [this.FAVORITES_USERS, id].join('/')
  },
  PROFILE: '/profile',
  SIGN_IN: '/sign-in',
  TASK: '/task',
  getTaskId(id: string): string {
    return [this.TASK, id].join('/')
  },
}
