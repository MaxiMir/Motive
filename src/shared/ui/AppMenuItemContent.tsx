import { ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/system'
import AppIcon from './AppIcon'

interface AppMenuItemContentProps {
  icon: string
  text: string
}

function AppMenuItemContent({ icon, text }: AppMenuItemContentProps) {
  return (
    <>
      <ListItemIconCompact>
        <AppIcon name={icon} />
      </ListItemIconCompact>
      <ListItemText>{text}</ListItemText>
    </>
  )
}

const ListItemIconCompact = styled(ListItemIcon)({
  '& .material-icons': {
    fontSize: 18,
  },
})

export default AppMenuItemContent
