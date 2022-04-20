import { Button } from '@mui/material'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useLocale from 'hooks/useLocale'
import { getUserUrn } from 'helpers/url'
import { ProfileIcon } from 'components/UI/icons'
import FooterIcon from './FooterIcon'

interface FooterProfileProps {
  nickname?: string
  asPath: string
  ariaLabel: string
}

export default function FooterProfile({ nickname, ariaLabel, asPath }: FooterProfileProps): JSX.Element {
  const { jump } = useLocale()
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserUrn(nickname)
  const selected = !href ? false : asPath.includes(href)

  const onClick = () => {
    if (href) {
      jump(href)
      return
    }

    openSignIn({ callbackUrl: '/' })
  }

  return (
    <Button aria-label={ariaLabel} onClick={onClick}>
      <FooterIcon Icon={ProfileIcon} selected={selected} />
    </Button>
  )
}
