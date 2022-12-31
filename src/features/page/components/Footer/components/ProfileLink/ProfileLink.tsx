import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { IconButton } from '@mui/material'
import { getUserHref } from '@features/user'
import { useOpenSignIn } from '@features/signin'
import useClient from '@hooks/useClient'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const ProfileIcon = dynamic(() => import('@ui/icons/ProfileIcon'))

interface ProfileLinkProps {
  asPath: string
  hoverOpacity: number
}

function ProfileLink({ asPath, hoverOpacity }: ProfileLinkProps) {
  const { push } = useRouter()
  const client = useClient()
  const messages = useMessages()
  const openSignIn = useOpenSignIn()
  const href = !client ? undefined : getUserHref(client.nickname)
  const selected = !href ? false : asPath.includes(href)

  const onClick = () => {
    if (href) {
      push(href)
      return
    }

    openSignIn({ callbackUrl: '/' })
  }

  return (
    <TooltipArrow title={messages.title}>
      <IconButton
        size="small"
        aria-label={messages.title}
        sx={{ opacity: !selected ? hoverOpacity : 1 }}
        onClick={onClick}
      >
        {!client ? (
          <ProfileIcon />
        ) : (
          <AvatarStatus name={client.name} src={client.avatar} size={24} />
        )}
      </IconButton>
    </TooltipArrow>
  )
}

export default ProfileLink
