import { Link } from '@mui/material'
import { UserBaseDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface MemberProps {
  member: UserBaseDto
  count: number
  offset: number
  index: number
}

export function Member({ member, count, offset, index }: MemberProps) {
  const href = joinToHref(member.nickname)

  return (
    <Link
      href={href}
      title={member.name}
      sx={{
        marginLeft: !index ? undefined : offset,
        zIndex: count - index,
      }}
    >
      <Avatar
        name={member.name}
        src={member.avatar}
        size={24}
        variant="contained"
        sx={{
          backgroundColor: 'rgb(41 41 41)',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'rgb(41 41 41)',
          },
        }}
      />
    </Link>
  )
}
