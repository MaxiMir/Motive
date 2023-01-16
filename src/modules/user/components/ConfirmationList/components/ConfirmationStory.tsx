import dynamic from 'next/dynamic'
import { Box, Button, Typography } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import { ConfirmationDto } from '@features/confirmation'
import useTryFullScreen from '@hooks/useTryFullScreen'
import useToggle from '@hooks/useToggle'
import AvatarStatus from '@components/Avatar/AvatarStatus'

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
      <Box display="flex" flexDirection="column" alignItems="center" minWidth={100} gap={1}>
        <Box
          sx={({ palette }) => ({
            padding: '2px',
            background: `linear-gradient(to top left, ${palette.motivation.dark}, ${palette.creativity.dark})`,
            borderRadius: '50%',
          })}
        >
          <Box
            sx={({ palette }) => ({
              borderRadius: '50%',
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
      </Box>
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
