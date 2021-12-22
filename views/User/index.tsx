import React from 'react'
import dynamic from 'next/dynamic'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { UserDetail, UserCharacteristicName, UserBase } from 'dto'
import { getUserHref } from 'views/User/helper'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import AppTypography from 'components/UI/AppTypography'
import { useScrollToGoal } from './hook'
import Avatar from './components/Avatar'
import Characteristic from './components/Characteristic'
import EmptyGoals from './components/EmptyGoals'
import Favorite from './components/Favorite'

const AddGoal = dynamic(() => import('./components/AddGoal'))
const GoalCard = dynamic(() => import('components/Goal'))

const CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['motivation', 'creativity', 'support']
const SECOND_CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['completed', 'abandoned', 'followers']

export interface DetailProps {
  user: UserDetail
  client: UserBase
  favorite: boolean
}

export default function Detail({ user, client, favorite }: DetailProps): JSX.Element {
  const { id, nickname, name, avatar, characteristic, goals } = user
  const theme = useTheme()
  const characteristicColors = useCharacteristicColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isOwner = id === client.id
  const href = getUserHref(nickname)

  useScrollToGoal()

  return (
    <AppContainer withFlexColumn>
      <AppBox alignItems="center" spacing={1} mb={2}>
        <AppTypography variant="h5" component="h1">
          {name}
        </AppTypography>
        {!isOwner && <Favorite userId={id} favorite={favorite} clientId={client.id} />}
      </AppBox>
      <AppBox flexDirection="column" spacing={3} flex={1}>
        <AppBox spacing={isMobile ? 1 : 4} mb={4}>
          <Avatar avatar={avatar} characteristic={characteristic} characteristicColors={characteristicColors} />
          <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
            <AppBox justifyContent="space-between">
              {CHARACTERISTIC_NAMES.map((characteristicName) => (
                <Characteristic
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  color={characteristicColors[characteristicName].fontColor}
                  key={characteristicName}
                />
              ))}
            </AppBox>
            <AppBox justifyContent="space-between">
              {SECOND_CHARACTERISTIC_NAMES.map((characteristicName) => (
                <Characteristic
                  name={characteristicName}
                  value={characteristic[characteristicName]}
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
              <GoalCard tmpl="current" goal={goal} client={client} href={href} key={goal.id} />
            ))}
          </AppBox>
        )}
      </AppBox>
    </AppContainer>
  )
}
