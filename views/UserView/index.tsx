import dynamic from 'next/dynamic'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { UserDetailDto, UserCharacteristicName, MainCharacteristicName } from 'dto'
import { getCharacteristicsTitle, getUserHref } from 'views/UserView/helper'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import useClient from 'hooks/useClient'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import AppTypography from 'components/UI/AppTypography'
import Avatar from './components/Avatar'
import Characteristic from './components/Characteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import { useScrollToGoal } from './hook'

const Goal = dynamic(() => import('components/Goal'))
const AddGoal = dynamic(() => import('./components/AddGoal'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']
const SECOND_CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['completed', 'abandoned', 'followers']

export interface UserViewProps {
  user: UserDetailDto
}

export default function UserView({ user }: UserViewProps): JSX.Element {
  const { nickname, name, avatar, characteristic, goals, following, membership } = user
  const theme = useTheme()
  const client = useClient()
  const characteristicColors = useCharacteristicColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const href = getUserHref(nickname)
  const characteristicsTitle = getCharacteristicsTitle()
  const clientPage = user.id === client?.id

  useScrollToGoal()

  return (
    <AppContainer flexColumn>
      <AppBox alignItems="center" spacing={1} mb={2}>
        <AppTypography variant="h5" component="h1">
          {name}
        </AppTypography>
        {!clientPage && <Following id={user.id} following={following} />}
      </AppBox>
      <AppBox flexDirection="column" spacing={3} flex={1}>
        <AppBox spacing={isMobile ? 1 : 4} mb={4}>
          <Avatar avatar={avatar} characteristic={characteristic} characteristicColors={characteristicColors} />
          <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
            <AppBox justifyContent="space-between">
              {CHARACTERISTIC_NAMES.map((characteristicName) => (
                <Characteristic
                  user={user}
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  title={characteristicsTitle[characteristicName]}
                  color={characteristicColors[characteristicName].fontColor}
                  key={characteristicName}
                />
              ))}
            </AppBox>
            <AppBox justifyContent="space-between">
              {SECOND_CHARACTERISTIC_NAMES.map((characteristicName) => (
                <Characteristic
                  user={user}
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  title={characteristicsTitle[characteristicName]}
                  color={characteristicColors[characteristicName].fontColor}
                  key={characteristicName}
                />
              ))}
            </AppBox>
          </AppBox>
        </AppBox>
        {clientPage && (
          <AppBox justifyContent="center">
            <AddGoal />
          </AppBox>
        )}
        {!goals.length ? (
          <EmptyGoals clientPage={clientPage} />
        ) : (
          <AppBox flexWrap="wrap" spacing={3}>
            {goals.map((goal) => (
              <Goal
                tmpl="current"
                goal={goal}
                href={href}
                client={client}
                clientPage={clientPage}
                membership={membership}
                key={goal.id}
              />
            ))}
          </AppBox>
        )}
      </AppBox>
    </AppContainer>
  )
}
