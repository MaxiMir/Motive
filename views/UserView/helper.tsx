import { UserCharacteristicName, UserDetailDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

interface UserMeta {
  title?: string
  description?: string
  url?: string
  type: string
  image?: string
}

export const getUserMeta = (user?: UserDetailDto): UserMeta => ({
  title: user && `${user.name} • profile on ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: user && `See how ${user.name} (@${user.nickname}) accomplishes his goals`,
  url: user && `${process.env.HOST}/${user.nickname}`,
  image: user?.avatar,
  type: 'profile',
})

export const getUserHref = (nickname: string): string => `/${nickname}/`

export const getCharacteristicsTitle = (): { [k in UserCharacteristicName]: JSX.Element | undefined } => ({
  motivation: (
    <>
      Motivation points are given for: <br />
      • goal completion <br />
      • each user who joins your goal <br />
      • every <AppEmoji name="motivation" onlyEmoji /> put on your day <br />
    </>
  ),
  creativity: (
    <>
      Creativity points are given for: <br />
      • every <AppEmoji name="creativity" onlyEmoji /> put on your day <br />
    </>
  ),
  support: (
    <>
      Support points are given for: <br />• each support message in discussion with <AppEmoji name="like" onlyEmoji />
    </>
  ),
  abandoned: (
    <>
      Goals were eaten up by Old Pitt <AppEmoji name="pitt" onlyEmoji />
    </>
  ),
  completed: undefined,
  followers: undefined,
})
