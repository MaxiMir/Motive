import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material'
import { styled } from '@mui/system'
import AppIcon from './AppIcon'

type AppMenuItemContentProps = Pick<MenuItemProps, 'onClick'> & {
  icon: string
  color?: string
  text: string
}

function AppMenuItem({ icon, text, color = 'primary.dark', onClick }: AppMenuItemContentProps) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIconCompact
        sx={{
          '& span': {
            color,
          },
        }}
      >
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
