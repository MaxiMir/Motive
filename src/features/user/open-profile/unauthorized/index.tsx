import { IconButton } from '@mui/material'
import { useViewerAct } from 'entities/viewer'
import { Profile } from 'shared/ui/icons'

function Unauthorized() {
  const onClick = useViewerAct(undefined, '/')

  return (
    <IconButton onClick={onClick}>
      <Profile sx={{ fontSize: 21, color: 'grey' }} />
    </IconButton>
  )
}

export default Unauthorized
