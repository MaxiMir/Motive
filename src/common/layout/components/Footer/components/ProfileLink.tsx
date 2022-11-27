import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import { getUserHref } from '@href'
import useOpenSignIn from '@hooks/useOpenSignIn'
import { ProfileIcon } from '@ui/icons'

interface ProfileLinkProps {
  nickname?: string
  asPath: string
  hoverOpacity: number
}

export default function ProfileLink({ nickname, asPath, hoverOpacity }: ProfileLinkProps) {
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
      <ProfileIcon sx={{ color: 'common.white', opacity: !selected ? hoverOpacity : 1 }} />
    </Button>
  )
}
