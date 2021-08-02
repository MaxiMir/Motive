import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { IconButton } from '@material-ui/core'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function GoalCardMenu(): JSX.Element {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <>
      <IconButton className={classes.button} title="open user menu" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreHorizIcon fontSize="small" color="secondary" className={classes.icon} />
      </IconButton>
      {anchorEl && 1}
    </>
  )
}

const useStyles = makeStyles({
  button: {
    padding: 3,
  },
  icon: {
    fontSize: '1.5rem',
  },
})
