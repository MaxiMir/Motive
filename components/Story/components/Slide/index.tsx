import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'helpers/url'
import { getDistance } from 'helpers/date'
import UserAvatar from 'components/User/UserAvatar'
import AppLink from 'components/ui/AppLink'
import Details from './components/Details'

export interface Story {
  url: string
  title: string
  started: string
  end: string
}

interface SlideProps {
  story: Story
  user: UserBaseDto
}

export default function StorySlide({ story, user }: SlideProps) {
  const { title, end } = story
  const { nickname, name, avatar } = user
  const { locale } = useLocale()
  const href = getUserHref(nickname)
  const distance = getDistance(end, locale)

  return (
    <Box
      sx={{
        transformStyle: 'preserve-3d',
        transform: 'rotateY(0)', // -90deg
        transitionDuration: '0ms', // 600ms
        width: '300vw',
        height: '100%',
        top: 0,
        bottom: 0,
        // left: '-100vw',
        position: 'absolute',
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <UserAvatar name={name} avatar={avatar} href={href} size={36} />
            <Box display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" gap={1}>
                <AppLink href={href} title={user.name} sx={{ fontSize: '0.875rem', textDecoration: 'none' }}>
                  <b>{name}</b>
                </AppLink>
                <TextTitle sx={{ color: 'text.disabled' }}>/</TextTitle>
                <TextTitle sx={{ color: 'creativity.light' }}>{title}</TextTitle>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {distance}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Details user={user} />
      </Box>
    </Box>
  )
}

const TextTitle = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 'bold',
})
