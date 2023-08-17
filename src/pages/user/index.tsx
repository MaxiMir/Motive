import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { UserContext, UserLevel } from 'entities/user'
import { useViewer } from 'entities/viewer'
import { ONLINE_SCORE_MAIN, SPHERES, UserPageDto } from 'shared/api'
import Container from 'shared/ui/Container'
import AvatarActs from './avatarActs'
import EmptyGoals from './emptyGoals'
import LearnMore from './learnMore'
import MenuActs from './menuActs'
import Nickname from './nickname'
import OnlineScore from './onlineScore'
import SphereProgress from './sphereProgress'
import UserStatus from './userStatus'

const Link = dynamic(() => import('@mui/material/Link'))
const UpdateFollowing = dynamic(() => import('features/subscription/update-following'))
const EditProfile = dynamic(() => import('./editProfile'))
const ConfirmationList = dynamic(() => import('./confirmationList'))
const GoalCurrent = dynamic(() => import('./goalCurrent'))
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
  const viewerPage = id === viewer?.id

  return (
    <UserContext.Provider value={user}>
      <Container sx={{ gap: 3 }}>
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
                  <Nickname nickname={nickname} />
                  <UserLevel level={characteristic.level} />
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
                display="flex"
                justifyContent={{
                  xs: 'space-between',
                  sm: 'initial',
                }}
                width="100%"
                gap={2}
                mb={2}
              >
                {ONLINE_SCORE_MAIN.map((score) => (
                  <OnlineScore
                    score={score}
                    value={characteristic[score]}
                    userId={id}
                    characteristic={characteristic}
                    confirmations={confirmations}
                    key={score}
                  />
                ))}
              </Box>
              <UserStatus online={online} lastSeen={lastSeen} device={device} mb={1}>
                <Typography component="h1" fontWeight="bold">
                  {name}
                </Typography>
              </UserStatus>
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
              <LearnMore user={user} />
            </Stack>
          </Section>
        </Stack>
        <Section display="flex" justifyContent="space-between" padding={{ xs: 2, md: '16px 24px' }}>
          {SPHERES.map((sphere) => (
            <SphereProgress sphere={sphere} value={characteristic[sphere]} key={sphere} />
          ))}
        </Section>
        {!!confirmations.length && <ConfirmationList confirmations={confirmations} />}
        {!goals.length ? (
          <EmptyGoals viewerPage={viewerPage} />
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
              <GoalCurrent goal={goal} viewerPage={viewerPage} key={goal.id} />
            ))}
          </Box>
        )}
        {viewerPage && <CreateGoal />}
      </Container>
    </UserContext.Provider>
  )
}

const Section = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  backgroundColor: theme.palette.grey[900],
  border: `0.5px solid ${theme.palette.grey[800]}`,
}))
