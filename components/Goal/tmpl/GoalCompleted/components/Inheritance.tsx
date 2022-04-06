import { Typography } from '@mui/material'
import { UserBaseDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import User from 'components/User'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  return (
    <AppBox alignItems="center" gap={1}>
      <Typography variant="caption">Creator:</Typography>
      <User tmpl="avatar" user={owner} />
    </AppBox>
  )
}
