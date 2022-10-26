import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { UserBaseDto } from '@dto'
import { getUserHref } from '@helpers/url'
import UserAvatar from '@components/User/UserAvatar'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps) {
  const { name, nickname, avatar } = owner
  const { formatMessage } = useIntl()
  const href = getUserHref(nickname)
  const creatorText = formatMessage({ id: 'common.creator' })

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="caption">{creatorText}:</Typography>
      <UserAvatar name={name} avatar={avatar} href={href} />
    </Box>
  )
}
