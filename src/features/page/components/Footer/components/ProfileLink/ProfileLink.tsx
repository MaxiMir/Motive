import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { getUserHref } from '@features/user'
import { useOpenSignIn } from '@features/signin'
import { ProfileIcon } from '@ui/icons'
import { useMessages } from './hooks/useMessages'

interface ProfileLinkProps {
  nickname?: string
  asPath: string
  hoverOpacity: number
}

function ProfileLink({ nickname, asPath, hoverOpacity }: ProfileLinkProps) {
  const messages = useMessages()
  const { push } = useRouter()
  const openSignIn = useOpenSignIn()
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)

  const onClick = () => {
    if (href) {
      push(href)
      return
    }

    openSignIn({ callbackUrl: '/' })
  }

  return (
    <Button aria-label={messages.ariaLabel} onClick={onClick}>
      <ProfileIcon sx={{ color: 'common.white', opacity: !selected ? hoverOpacity : 1 }} />
    </Button>
  )
}

export default ProfileLink
