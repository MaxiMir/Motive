import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button } from '@material-ui/core/'
import { ROUTE } from 'route'
import { Menu } from 'components/Menu'
import AppBox from 'components/UI/AppBox'

export const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.appBar}>
      <AppBox justifyContent="space-between">
        <Menu />
        <Button className={classes.button} href={ROUTE.SIGN_IN}>
          Sign in
        </Button>
      </AppBox>
    </AppBar>
  )
}

const useStyles = makeStyles({
  appBar: {
    padding: '32px 16px 10px',
    flexGrow: 1,
    backgroundColor: '#121212',
    boxShadow: 'none',
  },
  button: {
    fontSize: 18,
    textTransform: 'none',
  },
})
