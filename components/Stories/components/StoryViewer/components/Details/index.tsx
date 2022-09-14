import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { UserBaseDto } from 'dto'
import AppIcon from 'components/ui/AppIcon'
import Description from './components/Description'

interface DetailsProps {
  user: UserBaseDto
}

export default function Details({ user }: DetailsProps) {
  const [open, setOpen] = useState(false)
  console.log(user)

  const toggleMenu = () => setOpen(!open)

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
      <IconButton disabled onClick={toggleMenu}>
        <AppIcon name="expand_less" />
      </IconButton>
      {open && <Description onClose={toggleMenu} />}
    </Box>
  )
}
