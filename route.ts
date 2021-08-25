export default {
  INDEX: '/',
  TOP_OF_THE_DAY: '/top-of-the-day',
  SEARCH: '/search',
  RATING: '/rating',
  USERS: '/users',
  getUserId(id: string): string {
    return toUrn(this.USERS, id)
  },
  getUserFavorite(id: string): string {
    return toUrn(this.getUserId(id), 'favorite')
  },
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  SIGN_IN: '/sign-in',
  TASKS: '/tasks',
  getTaskId(id: string): string {
    return toUrn(this.TASKS, id)
  },
}

const toUrn = (...parts: string[]) => parts.join('/')
