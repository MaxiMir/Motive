export default {
  INDEX: '/',
  TOP_OF_THE_DAY: '/top-of-the-day',
  SEARCH: '/search',
  RATING: '/rating',
  USERS: '/users',
  getUser(id: string): string {
    return toUrn(this.USERS, id)
  },
  getUserFavorite(id: string): string {
    return toUrn(this.getUser(id))
  },
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  SIGN_IN: '/sign-in',
  GOALS: '/goals',
  getGoal(id: string): string {
    return toUrn(this.GOALS, id)
  },
  TASKS: '/tasks',
  getTaskId(id: string): string {
    return toUrn(this.TASKS, id)
  },
}

const toUrn = (...parts: string[]) => parts.join('/')
