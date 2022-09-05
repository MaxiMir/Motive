import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import AppIcon from 'components/ui/AppIcon'
import { UserBaseDto } from 'dto'

interface DetailsProps {
  user: UserBaseDto
}

export default function Details({ user }: DetailsProps) {
  const [open, setOpen] = useState(false)
  console.log(user)

  const toggleMenu = () => setOpen(!open)

  return (
    <Box display="flex" justifyContent="center" width="100vw">
      <IconButton onClick={toggleMenu}>
        <AppIcon name="expand_less" />
      </IconButton>
    </Box>
  )
}
