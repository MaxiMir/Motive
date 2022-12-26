import { Box, IconButton } from '@mui/material'
import { UserBaseDto } from '@features/user'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import Description from './components/Description'

interface BottomProps {
  user: UserBaseDto
}

function Bottom({ user }: BottomProps) {
  const [open, toggle] = useToggle()
  console.log(user)

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <IconButton disabled onClick={toggle}>
        <AppIcon name="expand_less" />
      </IconButton>
      {open && <Description onClose={toggle} />}
    </Box>
  )
}

export default Bottom
