import { Grid, Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useIntl } from 'react-intl'
import { UserRating } from 'entities/user'
import { MainCharacteristicName, UserDto } from 'shared/api'
import List from 'shared/ui/List'

interface TabContentProps {
  name: MainCharacteristicName
  users: UserDto[]
}

export function TabContent({ name, users }: TabContentProps) {
  const { formatMessage } = useIntl()
  const userText = formatMessage({ id: 'common.user' })
  const lvlText = formatMessage({ id: 'common.lvl' })

  return (
    <>
      <Box px={3} sx={{ background: blueGrey[900] }}>
        <Grid container alignItems="center" sx={{ height: 55 }}>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="center" width={22}>
              <Typography variant="subtitle1" component="p">
                <b>№</b>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="subtitle1" component="p">
              <b>{userText}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="p" align="right">
              <b>{lvlText}</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <List<UserDto>
        elements={users}
        keyGetter={(el) => el.id}
        render={(user, index) => <UserRating user={user} characteristicName={name} index={index} />}
      />
    </>
  )
}
