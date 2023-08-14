import { Box } from '@mui/material'
import Link from 'next/link'
import { UserBaseDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'
import Icon from 'shared/ui/Icon'

interface OwnerProps {
  owner: UserBaseDto
}

function Owner({ owner }: OwnerProps) {
  const { name, nickname, avatar } = owner
  const href = joinToHref(nickname)

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={0.5}
      ml={1}
      mb={1}
      sx={{
        fontSize: 14,
        '& span': {
          fontSize: 16,
        },
      }}
    >
      <Icon name="redo" color="zen.silent" />
      <Link href={href} title={name}>
        <Avatar src={avatar} name={name} size={20} />
      </Link>
      <Link href={href} title={name}>
        {owner.name}
      </Link>
    </Box>
  )
}

export default Owner
