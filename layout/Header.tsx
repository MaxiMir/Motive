import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button } from '@material-ui/core/'
import ROUTE from 'route'
import Menu from 'components/Menu'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'

export default function Header(): JSX.Element {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.appBar}>
      <AppContainer>
        <AppBox justifyContent="space-between">
          <Menu />
          <Button className={classes.button} href={ROUTE.SIGN_IN}>
            Sign in
          </Button>
        </AppBox>
      </AppContainer>
    </AppBar>
  )
}

const useStyles = makeStyles({
  appBar: {
    padding: '32px 0 10px',
    flexGrow: 1,
    backgroundColor: '#121212',
    boxShadow: 'none',
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
})
