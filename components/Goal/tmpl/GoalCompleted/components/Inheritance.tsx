import { UserBaseDto } from 'dto'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import User from 'components/User'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  return (
    <AppBox alignItems="center" spacing={1}>
      <AppTypography variant="caption">Creator:</AppTypography>
      <User tmpl="avatar" user={owner} />
    </AppBox>
  )
}
