import { Box, Button, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useUserContext } from 'entities/user'
import { ConfirmationDto } from 'shared/api'
import { useTryFullScreen, useToggle } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'

const Stories = dynamic(() => import('features/stories'))

interface StoryProps {
  confirmation: ConfirmationDto
}

function Story({ confirmation }: StoryProps) {
  const { id, goal, photos, end } = confirmation
  const user = useUserContext()
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const { ref, supported, enter, exit } = useTryFullScreen()
  const [mainPhoto] = photos
  const stories = [mainPhoto] // TODO confirmation.photos.map
  const ariaLabel = formatMessage({ id: 'common.open' })

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
      <Stack alignItems="center" gap={0.5} minWidth={100}>
        <Box
          padding="2px"
          borderRadius="50%"
          sx={({ palette }) => ({
            background: `linear-gradient(to top left, ${palette.motivation.dark}, ${palette.creativity.dark})`,
          })}
        >
          <StyledBox>
            <Avatar
              src={mainPhoto.src}
              name={goal.name}
              size={60}
              aria-label={ariaLabel}
              onClick={onClick}
            />
          </StyledBox>
        </Box>
        <Button data-unit={`confirmation-${id}`} size="small" color="inherit" onClick={onClick}>
          <Typography
            variant="caption"
            maxWidth={95}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {goal.name}
          </Typography>
        </Button>
      </Stack>
      {open && (
        <Stories
          user={user}
          stories={stories}
          title={goal.name}
          date={end}
          fullscreen={{ ref, supported }}
          onClose={onClose}
        />
      )}
    </>
  )
}

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  background: theme.palette.background.default,
  ':hover': {
    background: 'rgba(144, 202, 249, 0.08)',
  },
}))

export default Story
