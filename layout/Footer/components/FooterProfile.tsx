import { Button } from '@material-ui/core'
import useOpenSignIn from 'hooks/useOpenSignIn'
import { getUserHref } from 'views/UserView/helper'
import { ProfileIcon } from 'components/UI/icons'
import FooterIcon from './FooterIcon'

interface FooterProfileProps {
  nickname?: string
  asPath: string
}

export default function FooterProfile({ nickname, asPath }: FooterProfileProps): JSX.Element {
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)

  const onClick = () => openSignIn({ callbackUrl: '/' })

  return (
    <Button href={href} onClick={href ? undefined : onClick}>
      <FooterIcon Icon={ProfileIcon} selected={selected} />
    </Button>
  )
}
