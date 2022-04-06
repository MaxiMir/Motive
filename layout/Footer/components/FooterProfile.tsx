import { Button } from '@mui/material'
import { common } from '@mui/material/colors'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'views/UserView/helper'
import { ProfileIcon } from 'components/UI/icons'
import FooterIcon from './FooterIcon'

interface FooterProfileProps {
  nickname?: string
  asPath: string
}

export default function FooterProfile({ nickname, asPath }: FooterProfileProps): JSX.Element {
  const { jump } = useLocale()
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)

  const onClick = () => {
    if (href) {
      jump(href)
      return
    }

    openSignIn({ callbackUrl: '/' })
  }

  return (
    <Button sx={{ color: common.white }} onClick={onClick}>
      <FooterIcon Icon={ProfileIcon} selected={selected} />
    </Button>
  )
}
