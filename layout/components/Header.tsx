import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, IconButton } from '@material-ui/core/'
import 'nprogress/nprogress.css'
import { AppBox } from 'components/UI/AppBox'
import { MenuIcon } from 'components/UI/icons'
import { LINK } from 'link'

export const Header: FC = () => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.appBar}>
      <AppBox justifyContent="space-between">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button className={classes.button} href={LINK.SIGN_IN}>
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
