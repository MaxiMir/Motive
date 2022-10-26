import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Box, Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserDetailDto, SecondCharacteristicName, MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS } from '@dto'
import { getUserHref } from '@href'
import useClient from '@hooks/useClient'
import AppContainer from '@ui/AppContainer'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import SecondCharacteristic from './components/SecondCharacteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import MainCharacteristic from './components/MainCharacteristic'

const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('./components/GoalCurrent'))
const Edit = dynamic(() => import('./components/Edit'))

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
  } = user
  const client = useClient()
  const href = getUserHref(nickname)
  const clientPage = id === client?.id
  const userBase = { id, name, nickname, avatar }
  const withConfirmationsList = !!confirmations.length || clientPage

  return (
    <AppContainer>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        my={3}
        className="apple-hide"
        sx={{
          justifyContent: {
            xs: 'center',
            md: 'start',
          },
        }}
      >
        <Typography variant="h5" component="h1">
          {name}
        </Typography>
        {clientPage && <Edit user={user} />}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        className="apple-hide"
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
        <AvatarStatus src={avatar} name={name} size={190} online={online} lastSeen={lastSeen} device={device} />
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            {SECOND_CHARACTERISTICS.map((characteristicName) => (
              <Fragment key={characteristicName}>
                <SecondCharacteristic
                  user={user}
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                />
                {characteristicName === SecondCharacteristicName.Abandoned && <DashedDivider orientation="vertical" />}
              </Fragment>
            ))}
          </Box>
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
      {!clientPage && <Following id={user.id} following={following} />}
      {!goals.length ? (
        <EmptyGoals clientPage={clientPage} />
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3} className="apple-hide">
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
