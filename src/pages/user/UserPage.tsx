import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useCheckOnClientPage, UserContext } from 'entities/user'
import { MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS, UserPageDto } from 'shared/api'
import Container from 'shared/ui/Container'
import Avatar from './components/Avatar'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import LearnMore from './components/LearnMore'
import MainCharacteristic from './components/MainCharacteristic'
import MenuActions from './components/MenuActions'
import Nickname from './components/Nickname'
import SecondCharacteristic from './components/SecondCharacteristic'

const Link = dynamic(() => import('@mui/material/Link'))
const EditProfile = dynamic(() => import('./components/EditProfile'))
const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('./components/GoalCurrent'))

interface UserViewProps {
  user: UserPageDto
}

function UserPage({ user }: UserViewProps) {
  const {
    id,
    name,
    nickname,
    characteristic,
    goals,
    membership,
    clientMembership,
    confirmations,
    motto,
    links,
  } = user
  const clientPage = useCheckOnClientPage(id)
  const renderConfirmationsList = !!confirmations.length || clientPage

  return (
    <UserContext.Provider value={user}>
      <UserContainer>
        <Stack spacing="12px">
          <Section
            display="flex"
            flexWrap="wrap"
            component="section"
            sx={{
              gap: {
                xs: 2,
                sm: 4,
                md: 6,
              },
              alignItems: 'flex-end',
              justifyContent: {
                xs: 'center',
                sm: 'flex-start',
              },
            }}
          >
            <Avatar user={user} clientPage={clientPage} />
            <Stack
              alignItems={{
                xs: 'center',
                sm: 'flex-start',
              }}
              flex={1}
            >
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                alignItems="center"
                spacing={{
                  xs: 1,
                  sm: 3,
                }}
                width="100%"
                mb={1}
              >
                <Nickname nickname={nickname} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  {clientPage ? <EditProfile /> : <Following />}
                  <MenuActions />
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between" spacing={2} mb={1}>
                {SECOND_CHARACTERISTICS.map((characteristicName) => (
                  <SecondCharacteristic
                    confirmations={confirmations}
                    name={characteristicName}
                    value={characteristic[characteristicName]}
                    key={characteristicName}
                  />
                ))}
              </Stack>
              <Typography component="h1" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              {motto && <Typography sx={{ fontSize: 14 }}>{motto}</Typography>}
              {links?.map(({ href, title }) => (
                <ExternalLink
                  href={href}
                  title={title}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  key={href}
                >
                  {href}
                </ExternalLink>
              ))}
              <LearnMore />
            </Stack>
          </Section>
          <Section display="flex" justifyContent="space-between" component="section">
            {MAIN_CHARACTERISTICS.map((characteristicName) => (
              <MainCharacteristic
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Section>
        </Stack>
        {renderConfirmationsList && (
          <ConfirmationList confirmations={confirmations} clientPage={clientPage} />
        )}
        {!goals.length ? (
          <EmptyGoals clientPage={clientPage} />
        ) : (
          <Box display="flex" flexWrap="wrap" alignItems="baseline" gap={3}>
            {goals.map((goal) => (
              <GoalCurrent
                goal={goal}
                membership={membership}
                clientPage={clientPage}
                clientMembership={clientMembership}
                key={goal.id}
              />
            ))}
          </Box>
        )}
      </UserContainer>
    </UserContext.Provider>
  )
}

const UserContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

const Section = styled(Box)(({ theme }) => ({
  padding: 8,
  borderRadius: '12px',
  backgroundColor: theme.palette.grey[900],
}))

const ExternalLink = styled(Link)({
  fontSize: 14,
})

export default UserPage
