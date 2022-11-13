import dynamic from 'next/dynamic'
import { Box, Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserDetailDto, MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS } from '@dto'
import { getUserHref } from '@href'
import useClient from '@hooks/useClient'
import AppContainer from '@ui/AppContainer'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import SecondCharacteristic from './components/SecondCharacteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import MainCharacteristic from './components/MainCharacteristic'
import ShareUser from './components/ShareUser'

const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('./components/GoalCurrent'))
const Edit = dynamic(() => import('./components/Edit'))
const Status = dynamic(() => import('./components/Status'))
const Location = dynamic(() => import('./components/Location'))
const Bio = dynamic(() => import('./components/Bio'))

export interface UserModuleProps {
  user: UserDetailDto
}

export function UserModule({ user }: UserModuleProps) {
  const {
    id,
    nickname,
    name,
    avatar,
    characteristic,
    goals,
    following,
    userMembership,
    clientMembership,
    confirmations,
    online,
    lastSeen,
    device,
    // status,
    // location
    // bio
  } = user
  const client = useClient()
  const href = getUserHref(nickname)
  const clientPage = id === client?.id
  const userBase = { id, name, nickname, avatar }
  const withConfirmationsList = !!confirmations.length || clientPage
  const status = "It's death to settle for things in life ☠️"
  const location = 'Pattaya'
  const bio = 'Dream developer 🧿'

  return (
    <AppContainer>
      {clientPage && <Edit user={user} />}
      <Box
        display="flex"
        flexWrap="wrap"
        mb={3}
        sx={{
          flexDirection: {
            // xs: 'column',
            md: 'row',
          },
          gap: {
            xs: 2,
            md: 6,
          },
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
        }}
      >
        <AvatarStatus src={avatar} name={name} size={190} online={online} lastSeen={lastSeen} device={device} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={1}
          sx={{
            alignItems: {
              xs: 'center',
              md: 'flex-start',
            },
          }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5" component="h1">
              {name}
            </Typography>
            {status && <Status status={status} />}
          </Box>
          {location && <Location location={location} />}
          <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            {SECOND_CHARACTERISTICS.map((characteristicName) => (
              <SecondCharacteristic
                user={user}
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Box>
          <Box display="flex" gap={2} my={1}>
            {!clientPage && <Following id={user.id} following={following} />}
            <ShareUser href={href} title={name} />
          </Box>
          {bio && <Bio bio={bio} />}
        </Box>
      </Box>
      <DashedDivider light sx={{ mb: 3 }} />
      <Box
        display="flex"
        flexWrap="wrap"
        mb={3}
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: {
            xs: 3,
            md: 6,
          },
        }}
      >
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Box display="flex" justifyContent="space-between">
            {MAIN_CHARACTERISTICS.map((characteristicName) => (
              <MainCharacteristic
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <DashedDivider light sx={{ mb: 3 }} />
      {withConfirmationsList && (
        <ConfirmationList user={userBase} confirmations={confirmations} clientPage={clientPage} />
      )}
      {!goals.length ? (
        <EmptyGoals clientPage={clientPage} />
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {goals.map((goal) => (
            <GoalCurrent
              goal={goal}
              href={href}
              userId={id}
              userMembership={userMembership}
              clientId={client?.id}
              clientPage={clientPage}
              clientMembership={clientMembership}
              key={goal.id}
            />
          ))}
        </Box>
      )}
    </AppContainer>
  )
}

const DashedDivider = styled(Divider)({
  borderStyle: 'dashed',
})
