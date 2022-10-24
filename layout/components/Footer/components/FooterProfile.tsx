import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import useOpenSignIn from 'hooks/useOpenSignIn'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'helpers/url'
import { ProfileIcon } from 'components/ui/icons'
import FooterIcon from './FooterIcon'

interface FooterProfileProps {
  nickname?: string
  asPath: string
}

export default function FooterProfile({ nickname, asPath }: FooterProfileProps) {
  const { formatMessage } = useIntl()
  const { go } = useLocale()
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)
  const ariaLabel = formatMessage({ id: 'component.footer.my' })

  const onClick = () => {
    if (href) {
      go(href)
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
