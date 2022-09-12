import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ConfirmationDto, UserBaseDto } from 'dto'
import AppAvatar from 'components/ui/AppAvatar'
import Story from 'components/Story'

interface ConfirmationStoryProps {
  user: UserBaseDto
  confirmation: ConfirmationDto
}

export default function ConfirmationStory({ user, confirmation }: ConfirmationStoryProps) {
  const [open, setOpen] = useState(false)
  const [mainPhoto] = confirmation.photos

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1} mx={1}>
        <Box
          sx={(theme) => ({
            padding: '2px',
            background: `linear-gradient(to top left, ${theme.palette.motivation.dark}, ${theme.palette.creativity.dark})`,
            borderRadius: '50%',
          })}
        >
          <Button
            variant="text"
            color="primary"
            size="small"
            sx={(theme) => ({
              borderRadius: '50%',
              background: theme.palette.background.default,
            })}
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
        <Story
          user={user}
          moments={[
            {
              id: confirmation.id,
              url: confirmation.photos[0].src,
              title: confirmation.goal.name,
              started: confirmation.started,
              end: confirmation.end,
            },
          ]}
          onClose={toggleModal}
        />
      )}
    </>
  )
}
