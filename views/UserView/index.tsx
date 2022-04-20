import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { UserDetailDto, UserCharacteristicName, MainCharacteristicName } from 'dto'
import { getUserUrn } from 'helpers/url'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import AppContainer from 'components/UI/AppContainer'
import Avatar from './components/Avatar'
import Characteristic from './components/Characteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import { useScrollToGoal } from './hook'

const Goal = dynamic(() => import('components/Goal'))
const Edit = dynamic(() => import('./components/Edit'))
const AddGoal = dynamic(() => import('./components/AddGoal'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']
const SECOND_CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['completed', 'abandoned', 'followers']

export interface UserViewProps {
  user: UserDetailDto
  locale: Locale
}

export default function UserView({ user, locale }: UserViewProps): JSX.Element {
  const { id, nickname, name, avatar, characteristic, goals, following, userMembership, clientMembership } = user
  const client = useClient()
  const href = getUserUrn(nickname)
  const clientPage = id === client?.id

  useScrollToGoal()

  return (
    <AppContainer>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Typography variant="h5" component="h1">
          {name}
        </Typography>
        {clientPage ? (
          <Edit user={user} locale={locale} />
        ) : (
          <Following id={user.id} following={following} locale={locale} />
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap={3} flex={1}>
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
              {CHARACTERISTIC_NAMES.map((characteristicName) => (
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
              {SECOND_CHARACTERISTIC_NAMES.map((characteristicName) => (
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
        {clientPage && <AddGoal />}
        {!goals.length ? (
          <EmptyGoals clientPage={clientPage} locale={locale} />
        ) : (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {goals.map((goal) => (
              <Goal
                tmpl="current"
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
      </Box>
    </AppContainer>
  )
}
