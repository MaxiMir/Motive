import { Box, Stack, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useCheckOnMobile } from 'entities/device'
import { UserContext, UserStatus } from 'entities/user'
import { useClient } from 'entities/viewer'
import { ONLINE_SCORE_MAIN, UserPageDto } from 'shared/api'
import Container from 'shared/ui/Container'
import AvatarActs from './avatarActs'
import EmptyGoals from './emptyGoals'
import LearnMore from './learnMore'
import MenuActions from './menuActions'
import Nickname from './nickname'
import OnlineScore from './onlineScore'

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
    online,
    lastSeen,
    device,
  } = user
  const mobile = useCheckOnMobile()
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
              alignItems: 'center',
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

              {!mobile ? (
                <Box display="flex" width="100%" gap={2} mb={2}>
                  {(['level', ...ONLINE_SCORE_MAIN] as const).map((score) => (
                    <OnlineScore
                      name={score}
                      value={characteristic[score]}
                      userId={id}
                      characteristic={characteristic}
                      confirmations={confirmations}
                      key={score}
                    />
                  ))}
                </Box>
              ) : (
                <Table size="small" sx={{ width: 'initial', marginInline: 4, mb: 2 }}>
                  <TableBody>
                    <TableRow sx={{ '& td': { border: 0 } }}>
                      {(['level', 'completed', 'abandoned'] as const).map((score) => (
                        <TableCell align="left" key={score}>
                          <OnlineScore
                            name={score}
                            value={characteristic[score]}
                            userId={id}
                            characteristic={characteristic}
                            confirmations={confirmations}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow sx={{ '& td': { border: 0 } }}>
                      {(['followers', 'empty', 'following'] as const).map((score) => (
                        <TableCell align="left" key={score}>
                          {score !== 'empty' && (
                            <OnlineScore
                              name={score}
                              value={characteristic[score]}
                              userId={id}
                              characteristic={characteristic}
                              confirmations={confirmations}
                            />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              )}
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
