import dynamic from 'next/dynamic'
import { Box, Divider, Typography } from '@mui/material'
import { UserDetailDto, MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS } from 'dto'
import { getUserUrn } from 'helpers/url'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import AppContainer from 'components/ui/AppContainer'
import Avatar from './components/Avatar'
import Characteristic from './components/Characteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'

const GoalCurrent = dynamic(() => import('components/Goal/GoalCurrent'))
const Status = dynamic(() => import('./components/Status'))
const Edit = dynamic(() => import('./components/Edit'))
const AddGoal = dynamic(() => import('./components/AddGoal'))

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
    online,
    lastSeen,
    device,
  } = user
  const client = useClient()
  const href = getUserUrn(nickname)
  const clientPage = id === client?.id

  return (
    <AppContainer>
      <Box display="flex" flexDirection="column" mb={2}>
        <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" component="h1">
              {name}
            </Typography>
            {clientPage && <Edit user={user} locale={locale} />}
          </Box>
          <Status online={online} lastSeen={lastSeen} device={device} />
        </Box>
      </Box>
      <Divider light sx={{ mb: 3 }} />
      <Box
        display="flex"
        sx={{
          gap: {
            xs: 1,
            md: 4,
          },
        }}
      >
        <Avatar avatar={avatar} characteristic={characteristic} />
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Box display="flex" justifyContent="space-between">
            {MAIN_CHARACTERISTICS.map((characteristicName) => (
              <Characteristic
                user={user}
                name={characteristicName}
                value={characteristic[characteristicName]}
                locale={locale}
                key={characteristicName}
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between">
            {SECOND_CHARACTERISTICS.map((characteristicName) => (
              <Characteristic
                user={user}
                name={characteristicName}
                value={characteristic[characteristicName]}
                locale={locale}
                key={characteristicName}
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Divider light sx={{ my: 3 }} />
      <Box display="flex" justifyContent="center" mb={3}>
        {clientPage ? <AddGoal /> : <Following id={user.id} following={following} locale={locale} />}
      </Box>
      {!goals.length ? (
        <EmptyGoals clientPage={clientPage} locale={locale} />
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
