import { Container, Grid, makeStyles } from '@material-ui/core'
import { UserDto, MainCharacteristicName } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'
import AppTypography from 'components/UI/AppTypography'
import User from 'components/User'

interface TabContentProps {
  name: MainCharacteristicName
  users: UserDto[]
}

export default function TabContent({ name, users }: TabContentProps): JSX.Element {
  const classes = useStyles()
  const colors = useCharacteristicColors()

  return (
    <>
      <div className={classes.root}>
        <Container fixed>
          <Grid container alignItems="center" className={classes.container}>
            <Grid item xs>
              <AppBox justifyContent="center" width={22}>
                <AppTypography variant="subtitle1" component="p">
                  <b>№</b>
                </AppTypography>
              </AppBox>
            </Grid>
            <Grid item xs={8}>
              <AppTypography variant="subtitle1" component="p">
                <b>User</b>
              </AppTypography>
            </Grid>
            <Grid item xs>
              <AppTypography variant="subtitle1" component="p" align="right">
                <b>Level</b>
              </AppTypography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <AppList<UserDto>
        elements={users}
        keyGetter={(el) => el.id}
        render={(user, index) => (
          <User tmpl="rating" user={user} characteristicName={name} color={colors[name].fontColor} index={index} />
        )}
      />
    </>
  )
}

const useStyles = makeStyles({
  root: {
    background: '#21262C',
  },
  container: {
    height: 55,
  },
})
