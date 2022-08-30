import { useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { ConfirmationDto, MemberDto } from 'dto'
import AppAvatar from 'components/ui/AppAvatar'
import ModalConfirmation from 'components/Modal/ModalConfirmation'

interface ConfirmationPreviewProps {
  userId: number
  clientMembership: MemberDto[]
  confirmation: ConfirmationDto
}

export default function ConfirmationPreview({ userId, clientMembership, confirmation }: ConfirmationPreviewProps) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [mainPhoto] = confirmation.photos

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} mx={1}>
        <Box
          sx={{
            padding: '2px',
            background: `linear-gradient(to top left, ${theme.palette.support.dark}, ${theme.palette.creativity.dark})`,
            borderRadius: '50%',
          }}
        >
          <Button
            variant="text"
            color="primary"
            size="small"
            sx={{
              borderRadius: '50%',
              background: theme.palette.background.default,
            }}
            onClick={toggleModal}
          >
            <AppAvatar src={mainPhoto.src} size={65} />
          </Button>
        </Box>
        <Button sx={{ padding: '4px', textTransform: 'none' }} onClick={toggleModal}>
          <Typography variant="caption" sx={{ color: 'creativity.light' }}>
            {confirmation.goal.name}
          </Typography>
        </Button>
      </Box>
      {open && (
        <ModalConfirmation
          userId={userId}
          clientMembership={clientMembership}
          confirmation={confirmation}
          onClose={toggleModal}
        />
      )}
    </>
  )
}
