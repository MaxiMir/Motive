import dynamic from 'next/dynamic'
import { Box, Button, Typography } from '@mui/material'
import { ConfirmationDto, UserBaseDto } from '@dto'
import useFullScreen from '@hooks/useFullScreen'
import AvatarStatus from '@components/Avatar/AvatarStatus'

const Stories = dynamic(() => import('@components/Stories'))

interface ConfirmationStoryProps {
  user: UserBaseDto
  confirmation: ConfirmationDto
}

export default function ConfirmationStory({ user, confirmation }: ConfirmationStoryProps) {
  const { ref, enabled, open, onOpen, onClose } = useFullScreen()
  const [mainPhoto] = confirmation.photos
  const stories = [mainPhoto] // TODO confirmation.photos.map

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" width={100} gap={1} mr={1}>
        <Box
          sx={(theme) => ({
            padding: '2px',
            background: `linear-gradient(to top left, ${theme.palette.motivation.dark}, ${theme.palette.creativity.dark})`,
            borderRadius: '50%',
          })}
        >
          <Box
            sx={(theme) => ({
              borderRadius: '50%',
              background: theme.palette.background.default,
              '&:hover': {
                background: 'rgba(144, 202, 249, 0.08)',
              },
            })}
          >
            <AvatarStatus src={mainPhoto.src} name={user.name} size={60} onClick={onOpen} />
          </Box>
        </Box>
        <Button size="small" sx={{ textTransform: 'none' }} onClick={onOpen}>
          <Typography
            variant="caption"
            sx={{
              maxWidth: 95,
              color: 'creativity.light',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {confirmation.goal.name}
          </Typography>
        </Button>
      </Box>
      {open && (
        <Stories
          user={user}
          stories={stories}
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
