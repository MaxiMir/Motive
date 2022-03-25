import { Grid } from '@material-ui/core'
import { UserDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import User from 'components/User'

interface UsersListProps {
  users: UserDto[]
}

export default function UsersList({ users }: UsersListProps): JSX.Element {
  return (
    <AppBox flexDirection="column" spacing={2}>
      <AppTitle variant="h4" component="h2" name="followers">
        Users
      </AppTitle>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={user.id}>
            <User tmpl="search" user={user} />
          </Grid>
        ))}
      </Grid>
    </AppBox>
  )
}
