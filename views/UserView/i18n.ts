import { UserDetailDto } from 'dto'

export default {
  en: {
    getTitle(user: UserDetailDto): string {
      return `${user.name} (@${user.nickname}) • profile on`
    },
    getDescription(user: UserDetailDto): string {
      return `See how ${user.name} (@${user.nickname}) accomplishes goals`
    },
  },
  ru: {
    getTitle(user: UserDetailDto): string {
      return `${user.name} (@${user.nickname}) • профиль на`
    },
    getDescription(user: UserDetailDto): string {
      return `Посмотрите как ${user.name} (@${user.nickname}) достигает целей`
    },
  },
  uk: {
    getTitle(user: UserDetailDto): string {
      return `${user.name} (@${user.nickname}) • профіль на`
    },
    getDescription(user: UserDetailDto): string {
      return `Погляньте як ${user.name} (@${user.nickname}) досягає цілей`
    },
  },
}
