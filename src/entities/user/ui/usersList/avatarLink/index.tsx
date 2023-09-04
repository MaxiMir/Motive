import { styled } from '@mui/system'
import Link from 'next/link'
import { UserBaseDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface AvatarLinkProps {
  user: UserBaseDto
}

export function AvatarLink({ user }: AvatarLinkProps) {
  const href = joinToHref(user.nickname)

  return (
    <Link href={href} title={user.name}>
      <StyledAvatar name={user.name} src={user.avatar} size={24} variant="contained" />
    </Link>
  )
}

const StyledAvatar = styled(Avatar)({
  backgroundColor: 'rgb(41 41 41)',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'rgb(41 41 41)',
  },
})
