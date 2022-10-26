import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ConfirmationDto, UserBaseDto } from '@dto'
import useFullScreen from '@hooks/useFullScreen'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import Stories from '@components/Stories'

interface ConfirmationStoryProps {
  user: UserBaseDto
  confirmation: ConfirmationDto
}

export default function ConfirmationStory({ user, confirmation }: ConfirmationStoryProps) {
  const [open, setOpen] = useState(false)
  const { ref, enabled, enter, exit } = useFullScreen()
  const [mainPhoto] = confirmation.photos

  const onOpen = () => {
    setOpen(true)
    setTimeout(enter, 0)
  }

  const onClose = () => {
    setOpen(false)
    exit()
  }

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
            onClick={onOpen}
          >
            <AvatarStatus src={mainPhoto.src} name={user.name} size={65} />
          </Button>
        </Box>
        <Button sx={{ padding: '4px', textTransform: 'none' }} onClick={onOpen}>
          <Typography variant="caption" sx={{ color: 'creativity.light' }}>
            {confirmation.goal.name}
          </Typography>
        </Button>
      </Box>
      {open && (
        <Stories
          user={user}
          stories={[confirmation.photos[0]].map((photo, index) => ({
            id: index,
            url: photo.src,
          }))}
          title={confirmation.goal.name}
          date={confirmation.end}
          fullscreenEnabled={enabled}
          fullscreenRef={ref}
          onClose={onClose}
        />
      )}
    </>
  )
}
