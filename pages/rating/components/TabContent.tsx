import { Container, Grid, makeStyles } from '@material-ui/core'
import { User, MainCharacteristicName } from 'dto'
import UserCard from 'components/UserCard'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'
import AppTypography from 'components/UI/AppTypography'

interface TabContentProps {
  name: MainCharacteristicName
  users: User[]
}

export default function TabContent({ name, users }: TabContentProps): JSX.Element {
  const classes = useStyles()

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
      <AppList<User>
        elements={users}
        keyGetter={(el) => el.id}
        render={(user, index) => <UserCard type="rating" {...user} characteristicName={name} index={index} />}
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
