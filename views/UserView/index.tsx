import dynamic from 'next/dynamic'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { UserDetailDto, UserCharacteristicName, UserBaseDto, MainCharacteristicName } from 'dto'
import { getCharacteristicsTitle, getUserHref } from 'views/UserView/helper'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import AppTypography from 'components/UI/AppTypography'
import { useScrollToGoal } from './hook'
import Avatar from './components/Avatar'
import Characteristic from './components/Characteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'

const AddGoal = dynamic(() => import('./components/AddGoal'))
const Goal = dynamic(() => import('components/Goal'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']
const SECOND_CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['completed', 'abandoned', 'followers']

export interface UserViewProps {
  user: UserDetailDto
  client?: UserBaseDto
}

export default function UserView({ user, client }: UserViewProps): JSX.Element {
  const { id, nickname, name, avatar, characteristic, goals, isFollowing } = user
  const theme = useTheme()
  const characteristicColors = useCharacteristicColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const href = getUserHref(nickname)
  const characteristicsTitle = getCharacteristicsTitle()
  const isAuthorized = !!client
  const isOwner = isAuthorized && id === client?.id

  useScrollToGoal()

  return (
    <AppContainer flexColumn>
      <AppBox alignItems="center" spacing={1} mb={2}>
        <AppTypography variant="h5" component="h1">
          {name}
        </AppTypography>
        {!isOwner && <Following id={id} isFollowing={isFollowing} isAuthorized={isAuthorized} />}
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
        {isOwner && (
          <AppBox justifyContent="center">
            <AddGoal />
          </AppBox>
        )}
        {!goals.length ? (
          <EmptyGoals isOwner={isOwner} />
        ) : (
          <AppBox flexWrap="wrap" spacing={3}>
            {goals.map((goal) => (
              <Goal tmpl="current" goal={goal} client={client} href={href} key={goal.id} />
            ))}
          </AppBox>
        )}
      </AppBox>
    </AppContainer>
  )
}
