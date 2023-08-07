import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { UserContext } from 'entities/user'
import { useClient } from 'entities/viewer'
import { ONLINE_SKILLS_MAIN, UserPageDto } from 'shared/api'
import Container from 'shared/ui/Container'
import AvatarActs from './avatarActions'
import EmptyGoals from './emptyGoals'
import LearnMore from './learnMore'
import MenuActions from './menuActions'
import Nickname from './nickname'
import OnlineSkill from './onlineSkill'

const Link = dynamic(() => import('@mui/material/Link'))
const UpdateFollowing = dynamic(() => import('features/subscription/update-following'))
const EditProfile = dynamic(() => import('./editProfile'))
const ConfirmationList = dynamic(() => import('./confirmationList'))
const GoalCurrent = dynamic(() => import('./goalCurrent'))

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
    clientMembership,
    confirmations,
    motto,
    links,
    following,
  } = user
  const client = useClient()
  const clientPage = id === client?.id
  const renderConfirmationsList = !!confirmations.length || clientPage

  return (
    <UserContext.Provider value={user}>
      <Container sx={{ gap: 3 }}>
        <Stack gap="12px">
          <Section
            display="flex"
            flexWrap="wrap"
            component="section"
            sx={{
              gap: {
                xs: 2,
                md: 6,
              },
              alignItems: 'flex-end',
              justifyContent: {
                xs: 'center',
                md: 'flex-start',
              },
            }}
          >
            <AvatarActs user={user} clientPage={clientPage} />
            <Stack
              alignItems={{
                xs: 'center',
                md: 'flex-start',
              }}
              flex={1}
            >
              <Stack
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                alignItems="center"
                gap={{
                  xs: 1,
                  md: 3,
                }}
                width="100%"
                mb={1}
              >
                <Nickname nickname={nickname} />
                <Stack direction="row" alignItems="center" gap={1}>
                  {clientPage ? (
                    <EditProfile user={user} />
                  ) : (
                    <UpdateFollowing userId={id} following={following} />
                  )}
                  <MenuActions clientPage={clientPage} />
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                gap={{
                  sm: 2,
                }}
                width={{
                  xs: '100%',
                  sm: 'initial',
                }}
                mb={1}
              >
                {ONLINE_SKILLS_MAIN.map((characteristicName) => (
                  <OnlineSkill
                    name={characteristicName}
                    value={characteristic[characteristicName]}
                    userId={id}
                    characteristic={characteristic}
                    confirmations={confirmations}
                    key={characteristicName}
                  />
                ))}
              </Stack>
              <Typography component="h1" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              {motto && <Typography sx={{ fontSize: 14 }}>{motto}</Typography>}
              {links?.map(({ href, host, title }) => (
                <Link
                  href={href}
                  title={title}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  key={href}
                  sx={{ fontSize: 14 }}
                >
                  {host}
                </Link>
              ))}
              <LearnMore user={user} />
            </Stack>
          </Section>
        </Stack>
        {renderConfirmationsList && (
          <ConfirmationList confirmations={confirmations} clientPage={clientPage} />
        )}
        {!goals.length ? (
          <EmptyGoals clientPage={clientPage} />
        ) : (
          <Box
            sx={{
              columnCount: {
                xs: 1,
                md: 2,
              },
              columnGap: 3,
            }}
          >
            {goals.map((goal) => (
              <GoalCurrent
                goal={goal}
                nickname={nickname}
                clientPage={clientPage}
                clientMembership={clientMembership}
                key={goal.id}
              />
            ))}
          </Box>
        )}
      </Container>
    </UserContext.Provider>
  )
}

const Section = styled(Box)(({ theme }) => ({
  padding: 8,
  borderRadius: 8,
  backgroundColor: theme.palette.grey[900],
  border: `0.5px solid ${theme.palette.grey[800]}`,
}))
