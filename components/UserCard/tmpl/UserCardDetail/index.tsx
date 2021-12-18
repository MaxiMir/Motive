import React, { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { Client, UserDetail, UserCharacteristicName } from 'dto'
import { scrollToElem } from 'helpers/dom'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import AppTypography from 'components/UI/AppTypography'
import Avatar from './components/Avatar'
import Characteristic from './components/Characteristic'
import EmptyGoals from './components/EmptyGoals'
import Favorite from './components/Favorite'

const AddGoal = dynamic(() => import('./components/AddGoal'))
const GoalCard = dynamic(() => import('components/Goal'))

const CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['motivation', 'creativity', 'support']
const SECOND_CHARACTERISTIC_NAMES: UserCharacteristicName[] = ['completed', 'awards', 'abandoned']

export interface UserCardDetailProps {
  tmpl: 'detail'
  user: UserDetail
  client?: Client
}

export default function UserCardDetail({ user, client }: UserCardDetailProps): JSX.Element {
  const { id, nickname, name, preferences, avatar, characteristic, goals } = user
  const theme = useTheme()
  const { query } = useRouter()
  const characteristicColors = useCharacteristicColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isOwner = user.id === client?.id
  const favorite = useMemo(getFavorite, [client, isOwner, preferences.favorites])

  function getFavorite() {
    return !isOwner && Boolean(client && preferences.favorites?.includes(client.id))
  }

  useEffect(() => {
    query.s && scrollToElem(`goal-${query.s}`)
  }, [query])

  return (
    <AppContainer withFlexColumn>
      <AppBox alignItems="center" spacing={1} mb={2}>
        <AppTypography variant="h5" component="h1">
          {name}
        </AppTypography>
        {!isOwner && <Favorite id={id} favorite={favorite} />}
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
              <GoalCard tmpl="current" goal={goal} client={client} href={`/${nickname}`} key={goal.id} />
            ))}
          </AppBox>
        )}
      </AppBox>
    </AppContainer>
  )
}
