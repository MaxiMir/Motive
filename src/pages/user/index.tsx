import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useDeviceContext } from 'entities/device'
import { UserContext, UserLevel } from 'entities/user'
import { useViewer } from 'entities/viewer'
import { SCORE_MAIN, SPHERES, UserPageDto } from 'shared/api'
import Container from 'shared/ui/Container'
import AdditionalInfo from './additionalInfo'
import AvatarActs from './avatarActs'
import MenuActs from './menuActs'
import NoGoals from './noGoals'
import Score from './score'
import Sphere from './sphere'
import Status from './status'

const Link = dynamic(() => import('@mui/material/Link'))
const UpdateFollowing = dynamic(() => import('features/subscription/update-following'))
const EditProfile = dynamic(() => import('./editProfile'))
const Confirmations = dynamic(() => import('./confirmations'))
const GoalCard = dynamic(() => import('./goalCard'))
const CreateGoal = dynamic(() => import('./createGoal'))

interface UserViewProps {
  user: UserPageDto
}

export function UserPage({ user }: UserViewProps) {
  const {
    id,
    name,
    nickname,
    characteristic,
    goals,
    confirmations,
    motto,
    links,
    following,
    online,
    lastSeen,
    device,
  } = user
  const viewer = useViewer()
  const { isMobile } = useDeviceContext()
  const viewerPage = id === viewer?.id

  return (
    <UserContext.Provider value={user}>
      <Container sx={{ gap: 2, padding: isMobile ? '0 0 32px' : undefined }}>
        <Stack gap="12px">
          <Section
            display="flex"
            component="section"
            alignItems="center"
            flexDirection={{
              xs: 'column',
              lg: 'row',
            }}
            gap={{ lg: 4 }}
            padding={2}
          >
            <AvatarActs user={user} viewerPage={viewerPage} />
            <Stack
              alignItems={{
                xs: 'center',
                lg: 'flex-start',
              }}
              flex={1}
            >
              <Stack
                direction={{
                  xs: 'column',
                  lg: 'row',
                }}
                alignItems="center"
                gap={{
                  xs: 1,
                  lg: 3,
                }}
                width="100%"
                mb={1}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h5" component="p">
                    {nickname}
                  </Typography>
                  <UserLevel progress={characteristic.progress} />
                </Box>
                <Stack direction="row" alignItems="center" gap={1}>
                  {viewerPage ? (
                    <EditProfile user={user} />
                  ) : (
                    <UpdateFollowing userId={id} following={following} />
                  )}
                  <MenuActs viewerPage={viewerPage} />
                </Stack>
              </Stack>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, min-content)"
                width="100%"
                gap={2}
                mb={2}
              >
                {SCORE_MAIN.map((score) => (
                  <Score
                    score={score}
                    value={characteristic[score]}
                    userId={id}
                    characteristic={characteristic}
                    confirmations={confirmations}
                    key={score}
                  />
                ))}
              </Box>
              <Status online={online} lastSeen={lastSeen} device={device} mb={1}>
                <Typography component="h1" fontWeight="bold" mr={2}>
                  {name}
                </Typography>
              </Status>
              {motto && <Typography fontSize={14}>{motto}</Typography>}
              {links?.map(({ href, host, title }) => (
                <Link
                  href={href}
                  title={title}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  key={href}
                  fontSize={14}
                >
                  {host}
                </Link>
              ))}
              <AdditionalInfo user={user} />
            </Stack>
          </Section>
        </Stack>
        <Section display="flex" justifyContent="space-between" padding={{ xs: 2, md: '16px 24px' }}>
          {SPHERES.map((sphere) => (
            <Sphere
              userId={id}
              sphere={sphere}
              value={characteristic[sphere]}
              viewerPage={viewerPage}
              key={sphere}
            />
          ))}
        </Section>
        {!!confirmations.length && <Confirmations confirmations={confirmations} />}
        {!goals.length ? (
          <NoGoals viewerPage={viewerPage} />
        ) : (
          <Box
            sx={{
              columnCount: {
                xs: 1,
                md: 2,
              },
            }}
          >
            {goals.map((goal) => (
              <GoalCard goal={goal} viewerPage={viewerPage} key={goal.id} />
            ))}
          </Box>
        )}
      </Container>
      {viewerPage && <CreateGoal />}
    </UserContext.Provider>
  )
}

const Section = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.grey[900],
}))
