import { Button } from '@material-ui/core'
import useSignInModal from 'hooks/useSignInModal'
import { ProfileIcon } from 'components/UI/icons'
import { getUserHref } from 'views/UserView/helper'
import FooterIcon from './FooterIcon'

interface FooterProfileProps {
  nickname?: string
  asPath: string
}

export default function FooterProfile({ nickname, asPath }: FooterProfileProps): JSX.Element {
  const signIn = useSignInModal()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)

  return (
    <Button href={href} onClick={href ? undefined : signIn}>
      <FooterIcon Icon={ProfileIcon} selected={selected} />
    </Button>
  )
}
