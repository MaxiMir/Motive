import { styled } from '@mui/system'
import Link from 'next/link'
import { UserBaseDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserLinkProps {
  user: UserBaseDto
  chip?: boolean
}

export function UserLink({ user, chip }: UserLinkProps) {
  const href = joinToHref(user.nickname)

  return (
    <Link href={href} title={user.name}>
      <StyledAvatar name={user.name} src={user.avatar} size={24} variant="contained" chip={chip} />
    </Link>
  )
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'chip',
})<{ chip?: boolean }>(({ theme: _, chip }) => ({
  backgroundColor: chip ? 'rgb(41 41 41)' : '#121212',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: chip ? 'rgb(41 41 41)' : '#121212',
  },
}))
