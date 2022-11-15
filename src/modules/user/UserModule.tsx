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
import Info from './components/Info'
import Menu from './components/Menu'

const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('./components/GoalCurrent'))
const Motto = dynamic(() => import('./components/Motto'))

interface UserModuleProps {
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
    membership,
    clientMembership,
    confirmations,
    online,
    lastSeen,
    device,
    motto,
  } = user
  const client = useClient()
  const href = getUserHref(nickname)
  const clientPage = id === client?.id
  const userBase = { id, name, nickname, avatar }
  const withConfirmationsList = !!confirmations.length || clientPage

  return (
    <AppContainer>
      <Menu user={user} href={href} clientPage={clientPage} />
      <Box
        display="flex"
        flexWrap="wrap"
        mb={3}
        sx={{
          gap: {
            xs: 2,
            md: 3,
          },
          alignItems: 'flex-end',
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
          gap={1}
          sx={{
            alignItems: {
              xs: 'center',
              md: 'flex-start',
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={0.5}
            sx={{
              alignItems: {
                xs: 'center',
                md: 'flex-start',
              },
            }}
          >
            <Typography variant="h5" component="h1">
              {name}
            </Typography>
            {motto && <Motto motto={motto} />}
          </Box>
          <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
            {SECOND_CHARACTERISTICS.map((characteristicName) => (
              <SecondCharacteristic
                user={user}
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Box>
          <Box display="flex" flexWrap="wrap" my={1} width="100%" gap={2}>
            {!clientPage && <Following id={user.id} following={following} />}
            <Info user={user} />
          </Box>
        </Box>
      </Box>
      <DashedDivider light sx={{ mb: 3 }} />
      <Box display="flex" justifyContent="space-between" mb={3}>
        {MAIN_CHARACTERISTICS.map((characteristicName) => (
          <MainCharacteristic
            name={characteristicName}
            value={characteristic[characteristicName]}
            key={characteristicName}
          />
        ))}
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
              membership={membership}
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
