import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button } from '@material-ui/core'
import { SIGN_IN_ROUTE } from 'route'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'
import LeftMenu from './components/LeftMenu'

export default function Header(): JSX.Element {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.appBar}>
      <AppContainer>
        <AppBox justifyContent="space-between">
          <LeftMenu />
          <Button className={classes.button} href={SIGN_IN_ROUTE}>
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
