import { UserCharacteristicName, UserDetailDto } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

interface UserMeta {
  title?: string
  description?: string
  url?: string
  type: string
  image?: string
}

const getGoalsDescription = (user: UserDetailDto) => user.goals.map((g) => g.name).join(', ')

export const getUserMeta = (user?: UserDetailDto): UserMeta | null => {
  if (!user) {
    return null
  }

  const goalsDescription = getGoalsDescription(user)

  return {
    title: `${user.name} • profile on ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `See how ${user.name} (@${user.nickname}) accomplishes goals${
      !goalsDescription ? '' : `: ${goalsDescription}`
    }`,
    url: `${process.env.HOST}/${user.nickname}`,
    image: user.avatar || undefined,
    type: 'profile',
  }
}

export const getUserHref = (nickname: string): string => `/${nickname}`

export const getCharacteristicsTitle = (): { [k in UserCharacteristicName]: JSX.Element | undefined } => ({
  motivation: (
    <>
      Motivation points are given for: <br />
      • goal completion <br />
      • every <AppEmoji name="motivation" onlyEmoji /> put on your goal <br />
    </>
  ),
  creativity: (
    <>
      Creativity points are given for: <br />
      • every <AppEmoji name="creativity" onlyEmoji /> put on your goal <br />
    </>
  ),
  support: (
    <>
      Support points are given for: <br />• each <AppEmoji name="support" onlyEmoji /> put on your message in discussion
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
