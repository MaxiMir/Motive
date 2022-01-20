import { UserCharacteristicName } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

export const getCharacteristicHref = (name: UserCharacteristicName, href: string): string | undefined => {
  switch (name) {
    case 'completed':
    case 'followers':
      return [href, name].join('/')
    default:
      return undefined
  }
}

export const getCharacteristicTitle = (name: UserCharacteristicName): JSX.Element | undefined => {
  switch (name) {
    case 'motivation':
      return (
        <>
          Motivation points are given for: <br />
          • completion goals <br />
          • each user who joins your goal <br />
          • every <AppEmoji name={name} onlyEmoji /> put on your day <br />
        </>
      )
    case 'creativity':
      return (
        <>
          Creativity points are given for: <br />
          • every <AppEmoji name={name} onlyEmoji /> put on your day <br />
        </>
      )
    case 'support':
      return (
        <>
          Support points are given for: <br />
          • each reply to a user in a discussion on your day <br />
          • each message of support to another user in his goal <br />
        </>
      )
    case 'abandoned':
      return (
        <>
          Goals were eaten up by Old Pitt <AppEmoji name="pitt" onlyEmoji />
        </>
      )
    default:
      return undefined
  }
}
