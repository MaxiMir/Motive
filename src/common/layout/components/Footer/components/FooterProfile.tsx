import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import useOpenSignIn from 'src/common/hooks/useOpenSignIn'
import { getUserHref } from 'src/common/helpers/url'
import { ProfileIcon } from 'src/common/ui/icons'
import FooterIcon from './FooterIcon'

interface FooterProfileProps {
  nickname?: string
  asPath: string
}

export default function FooterProfile({ nickname, asPath }: FooterProfileProps) {
  const { formatMessage } = useIntl()
  const { push } = useRouter()
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)
  const ariaLabel = formatMessage({ id: 'component.footer.my' })

  const onClick = () => {
    if (href) {
      push(href)
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
