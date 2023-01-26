import { Box, Button, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import AvatarStatus from '@features/avatar-status'
import { useUserContext } from '@entities/user'
import { ConfirmationDto } from '@shared/api/dto'
import { useTryFullScreen, useToggle } from '@shared/lib/hooks'

const Stories = dynamic(() => import('@features/stories'))

interface ConfirmationStoryProps {
  confirmation: ConfirmationDto
}

function ConfirmationStory({ confirmation }: ConfirmationStoryProps) {
  const user = useUserContext()
  const [open, toggle] = useToggle()
  const { ref, supported, enter, exit } = useTryFullScreen()
  const [mainPhoto] = confirmation.photos
  const stories = [mainPhoto] // TODO confirmation.photos.map

  const onClick = () => {
    toggle()
    enter()
  }

  const onClose = () => {
    exit()
    toggle()
  }

  return (
    <>
      <Stack alignItems="center" spacing={1} minWidth={100}>
        <Box
          padding="2px"
          borderRadius="50%"
          sx={({ palette }) => ({
            background: `linear-gradient(to top left, ${palette.motivation.dark}, ${palette.creativity.dark})`,
          })}
        >
          <Box
            borderRadius="50%"
            sx={({ palette }) => ({
              background: palette.background.default,
              ':hover': {
                background: 'rgba(144, 202, 249, 0.08)',
              },
            })}
          >
            <AvatarStatus
              src={mainPhoto.src}
              name={user.name}
              size={60}
              buttonProps={{ onClick }}
            />
          </Box>
        </Box>
        <Button id={`confirmation-${confirmation.id}`} size="small" onClick={onClick}>
          <Typography
            variant="caption"
            sx={{
              maxWidth: 95,
              color: 'common.white',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {confirmation.goal.name}
          </Typography>
        </Button>
      </Stack>
      {open && (
        <Stories
          user={user}
          stories={stories}
          title={confirmation.goal.name}
          date={confirmation.end}
          fullscreen={{ ref, supported }}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default ConfirmationStory
