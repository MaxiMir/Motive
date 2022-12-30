import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material'
import { styled } from '@mui/system'
import AppIcon from './AppIcon'

type AppMenuItemContentProps = Pick<MenuItemProps, 'onClick'> & {
  icon: string
  color?: string
  text: string
}

function AppMenuItem({ icon, text, color, onClick }: AppMenuItemContentProps) {
  return (
    <MenuItem
      sx={{
        '& span': {
          color,
        },
      }}
      onClick={onClick}
    >
      <ListItemIconCompact>
        <AppIcon name={icon} />
      </ListItemIconCompact>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  )
}

const ListItemIconCompact = styled(ListItemIcon)({
  '& .material-icons': {
    fontSize: 18,
  },
})

export default AppMenuItem
