import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

const TabNames = (): JSX.Element => {
  const classes = useStyles()

  return (
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

export default TabNames
