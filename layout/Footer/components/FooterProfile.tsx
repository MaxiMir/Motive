import { useRouter } from 'next/router'
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
  const router = useRouter()
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)

  const onClick = () => {
    if (href) {
      router.push(href)
      return
    }

    openSignIn({ callbackUrl: '/' })
  }

  return (
    <Button onClick={onClick}>
      <FooterIcon Icon={ProfileIcon} selected={selected} />
    </Button>
  )
}
