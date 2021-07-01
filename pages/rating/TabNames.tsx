import { Container, Grid, Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'

const TabNames = (): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs>
            <AppBox justifyContent="center" width={22}>
              <Typography variant="subtitle1" component="p">
                <b>№</b>
              </Typography>
            </AppBox>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1" component="p">
              <b>User</b>
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" component="p" align="right">
              <b>Level</b>
            </Typography>
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
