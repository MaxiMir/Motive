import { Container, Grid, Box, Typography } from '@mui/material'
import { UserDto, MainCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppList from 'components/ui/AppList'
import UserRating from 'components/User/UserRating'
import i18n from './i18n'

interface TabContentProps {
  name: MainCharacteristicName
  users: UserDto[]
  locale: Locale
}

export default function TabContent({ name, users, locale }: TabContentProps) {
  const { userColumn, lvlColumn } = i18n[locale]

  return (
    <>
      <Box sx={{ background: '#21262C' }}>
        <Container fixed>
          <Grid container alignItems="center" sx={{ height: 55 }}>
            <Grid item xs>
              <Box display="flex" justifyContent="center" width={22}>
                <Typography variant="subtitle1" component="p">
                  <b>№</b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" component="p">
                <b>{userColumn}</b>
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" component="p" align="right">
                <b>{lvlColumn}</b>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <AppList<UserDto>
        elements={users}
        keyGetter={(el) => el.id}
        render={(user, index) => <UserRating user={user} characteristicName={name} index={index} />}
      />
    </>
  )
}
