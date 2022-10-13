import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Box, Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserDetailDto, SecondCharacteristicName, MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS } from 'dto'
import { getUserHref } from 'helpers/url'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import AppContainer from 'components/ui/AppContainer'
import AppAvatar from 'components/Avatar'
import SecondCharacteristic from './components/SecondCharacteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import MainCharacteristic from './components/MainCharacteristic'

const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('components/Goal/GoalCurrent'))
const Edit = dynamic(() => import('./components/Edit'))

export interface UserViewProps {
  user: UserDetailDto
  locale: Locale
}

export default function UserView({ user, locale }: UserViewProps) {
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
      <DashedDivider light sx={{ mb: 3 }} />
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mb={3}
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
        {clientPage && <Edit user={user} locale={locale} />}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
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
        <AppAvatar src={avatar} name={name} size={190} online={online} lastSeen={lastSeen} device={device} />
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Box display="flex" justifyContent="space-between" mb={3}>
            {SECOND_CHARACTERISTICS.map((characteristicName) => (
              <Fragment key={characteristicName}>
                <SecondCharacteristic
                  user={user}
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  locale={locale}
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
      <DashedDivider light sx={{ my: 3 }} />
      {withConfirmationsList && (
        <ConfirmationList user={userBase} confirmations={confirmations} clientPage={clientPage} />
      )}
      {!clientPage && <Following id={user.id} following={following} locale={locale} />}
      {!goals.length ? (
        <EmptyGoals clientPage={clientPage} locale={locale} />
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
