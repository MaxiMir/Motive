import { ListItemIcon, ListItemText, MenuItem, MenuItemProps } from '@mui/material'
import { styled } from '@mui/system'
import AppIcon from './AppIcon'

type AppMenuItemContentProps = Pick<MenuItemProps, 'onClick'> & {
  icon: string
  color?: string
  disabled?: boolean
  text: string
}

function AppMenuItem({
  icon,
  text,
  color = 'primary.dark',
  disabled,
  onClick,
}: AppMenuItemContentProps) {
  return (
    <MenuItem disabled={disabled} onClick={onClick}>
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
