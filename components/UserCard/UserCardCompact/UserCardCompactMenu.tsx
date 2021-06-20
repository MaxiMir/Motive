import { FC, useState, MouseEvent } from 'react'
import { createStyles, IconButton, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const UserCardCompactMenu: FC = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const onClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton className={classes.button} onClick={onClick}>
        <MoreHorizIcon fontSize="small" className={classes.icon} />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={onClose}
      >
        <MenuItem onClick={onClose}>Copy Link</MenuItem>
        <MenuItem onClick={onClose}>Remove from Favorites</MenuItem>
      </Menu>
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      padding: 3,
    },
    icon: {
      fontSize: '1.5rem',
      color: theme.palette.warning.light,
    },
  }),
)

export default UserCardCompactMenu
