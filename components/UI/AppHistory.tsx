import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles, IconButton } from '@material-ui/core'
import AppContainer from './AppContainer'
import AppBox from './AppBox'

export default function AppHistory(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  const onClick = () => window.history?.forward()

  return (
    <AppContainer className={classes.root}>
      <AppBox spacing={2}>
        <IconButton size="small" aria-label="To the previous page" className={classes.button} onClick={router.back}>
          <span className="material-icons">arrow_back</span>
        </IconButton>
        <IconButton size="small" aria-label="To the forward page" className={classes.button} onClick={onClick}>
          <span className="material-icons">arrow_forward</span>
        </IconButton>
      </AppBox>
    </AppContainer>
  )
}

const useStyles = makeStyles({
  root: {
    marginBottom: 24,
  },
  button: {
    background: '#feffda1c',
    color: '#99989D',
  },
})
