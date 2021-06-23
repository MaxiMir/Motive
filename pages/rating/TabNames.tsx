import { Container, Grid, Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const TabNames = () => {
  const classes = useStyles()

  return (
    <Container fixed>
      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs>
          <Typography variant="h6" component="p">
            №
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" component="p">
            User
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" component="p" align="right">
            Level
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles({
  container: {
    height: 55,
  },
})

export default TabNames
