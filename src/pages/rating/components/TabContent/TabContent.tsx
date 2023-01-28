import { Grid, Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { MainCharacteristicName, UserDto } from 'shared/api'
import List from 'shared/ui/List'
import UserRow from './components/UserRow'
import { useMessages } from './hooks/useMessages'

interface TabContentProps {
  name: MainCharacteristicName
  users: UserDto[]
}

function TabContent({ name, users }: TabContentProps) {
  const messages = useMessages()

  return (
    <>
      <Box
        px={3}
        sx={{
          clipPath: 'inset(0 -100vmax)',
          background: blueGrey[900],
          boxShadow: `0 0 0 100vmax ${blueGrey[900]}`,
        }}
      >
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
              <b>{messages.userText}</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="p" align="right">
              <b>{messages.lvlText}</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <List<UserDto>
        elements={users}
        keyGetter={(el) => el.id}
        render={(user, index) => <UserRow user={user} characteristicName={name} index={index} />}
      />
    </>
  )
}

export default TabContent
