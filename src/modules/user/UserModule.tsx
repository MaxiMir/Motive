import dynamic from 'next/dynamic'
import { Box, Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useCheckOnClientPage, UserContext } from '@modules/user/hooks'
import { UserPageDto } from '@features/page'
import { MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS } from '@features/characteristic'
import AppContainer from '@ui/AppContainer'
import Nickname from './components/Nickname'
import SecondCharacteristic from './components/SecondCharacteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import MainCharacteristic from './components/MainCharacteristic'
import Avatar from './components/Avatar'
import LearnMore from './components/LearnMore'
import MenuActions from './components/MenuActions'

const Link = dynamic(() => import('@mui/material/Link'))
const EditProfile = dynamic(() => import('./components/EditProfile'))
const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('./components/GoalCurrent'))

interface UserModuleProps {
  user: UserPageDto
}

function UserModule({ user }: UserModuleProps) {
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
  const showConfirmationsList = !!confirmations.length || clientPage

  return (
    <UserContext.Provider value={user}>
      <UserContainer>
        <Box
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
          <Avatar clientPage={clientPage} />
          <Box
            display="flex"
            flexDirection="column"
            flex={1}
            sx={{
              alignItems: {
                xs: 'center',
                sm: 'flex-start',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={1}
              width="100%"
              sx={{
                gap: {
                  xs: 1,
                  md: 3,
                },
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Nickname nickname={nickname} />
              <Box display="flex" alignItems="center" gap={1}>
                {clientPage ? <EditProfile /> : <Following />}
                <MenuActions />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={2} mb={1}>
              {SECOND_CHARACTERISTICS.map((characteristicName) => (
                <SecondCharacteristic
                  confirmations={confirmations}
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  key={characteristicName}
                />
              ))}
            </Box>
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
          </Box>
        </Box>
        <DashedDivider light />
        <Box display="flex" justifyContent="space-between" component="section">
          {MAIN_CHARACTERISTICS.map((characteristicName) => (
            <MainCharacteristic
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
        </Box>
        <DashedDivider light />
        {showConfirmationsList && (
          <ConfirmationList confirmations={confirmations} clientPage={clientPage} />
        )}
        {!goals.length ? (
          <EmptyGoals clientPage={clientPage} />
        ) : (
          <Box display="flex" flexWrap="wrap" gap={3}>
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

const UserContainer = styled(AppContainer)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

const DashedDivider = styled(Divider)({
  borderStyle: 'dashed',
})

const ExternalLink = styled(Link)({
  fontSize: 14,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
})

export default UserModule
