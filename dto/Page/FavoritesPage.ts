import { Page, User } from 'dto'

export type FavoritesPage = Page<{ favorites: User[] }>
