import React from 'react'
import { makeStyles, CircularProgress } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'

export default function Loader(): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBox alignItems="center" justifyContent="center" flex={1} height="100%">
        <CircularProgress size="3rem" color="primary" />
      </AppBox>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    borderRadius: 15,
    background: 'rgba(0, 0, 0, 0.7)',
  },
})
