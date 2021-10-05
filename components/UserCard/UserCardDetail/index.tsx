import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Client, Goal, UserDetail, UserCharacteristic } from 'dto'
import { numberToShort } from 'helpers/prepare'
import { scrollToElem } from 'helpers/dom'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppTooltip from 'components/UI/AppTooltip'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import AppTypography from 'components/UI/AppTypography'
import { AppListProps } from 'components/UI/AppList'
import UserCardFavorite from './UserCardFavorite'
import UserCardAvatar from './UserCardAvatar'
import UserCardCharacteristic from './UserCardCharacteristic'
import UserCardEmptyGoals from './UserCardEmptyGoals'

const UserCardAddGoal = dynamic(() => import('./UserCardAddGoal'))
const GoalCard = dynamic(() => import('components/GoalCard'))
const AppList = dynamic<AppListProps<Goal>>(() => import('components/UI/AppList'))

export interface UserCardDetailProps extends UserDetail {
  type: 'detail'
  client: Client
  onAddGoal: (goal: Goal) => void
}

const UserCardDetail = ({
  id,
  firstName,
  lastName,
  favorite,
  views,
  avatar,
  characteristics,
  role,
  goals,
  client,
  onAddGoal,
}: UserCardDetailProps): JSX.Element => {
  const classes = useStyles()
  const { query } = useRouter()
  const characteristicColors = useCharacteristicColors()
  const isOwner = role === 'OWNER'

  useEffect(() => {
    query.goal && scrollToElem(`goal-${query.goal}`)
  }, [id, query])

  return (
    <AppContainer withFlexColumn>
      <AppBox justifyContent="space-between" mb={2}>
        <AppBox alignItems="center" spacing={1}>
          <AppTypography variant="h5" component="h1">
            {firstName} {lastName}
          </AppTypography>
          {!isOwner && client.isAuthenticated && <UserCardFavorite client={client} id={id} favorite={favorite} />}
        </AppBox>
        <AppBox alignItems="center" spacing={0.5}>
          <AppTooltip title="Page Views" className={classes.tooltip}>
            <Image src="/images/eye.png" alt="eye" width={39} height={24} />
          </AppTooltip>
          <AppTypography variant="subtitle1" component="p" className={classes.views}>
            {numberToShort(views)}
          </AppTypography>
        </AppBox>
      </AppBox>
      <AppBox flexDirection="column" spacing={3} flex={1}>
        <AppBox spacing={1}>
          <UserCardAvatar
            avatar={avatar}
            characteristics={characteristics}
            characteristicColors={characteristicColors}
          />
          <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
            <AppBox justifyContent="space-between">
              {(['motivation', 'creativity', 'support'] as UserCharacteristic[]).map((type) => (
                <UserCardCharacteristic
                  type="user"
                  characteristic={type}
                  value={characteristics[type]}
                  color={characteristicColors[type].fontColor}
                  key={type}
                />
              ))}
            </AppBox>
            <AppBox justifyContent="space-between">
              {(['abandoned', 'completed'] as UserCharacteristic[]).map((type) => (
                <UserCardCharacteristic
                  type="user"
                  characteristic={type}
                  value={characteristics[type]}
                  color={characteristicColors[type].fontColor}
                  key={type}
                />
              ))}
            </AppBox>
          </AppBox>
        </AppBox>
        {isOwner && (
          <AppBox justifyContent="center">
            <UserCardAddGoal onAdd={onAddGoal} />
          </AppBox>
        )}
        {!goals.length ? (
          <UserCardEmptyGoals isOwner={isOwner} />
        ) : (
          <AppList
            elements={goals}
            keyGetter={(goal) => goal.id}
            spacing={3}
            flexDirection="row"
            render={(goal) => <GoalCard type="current" {...goal} client={client} />}
          />
        )}
      </AppBox>
    </AppContainer>
  )
}

const useStyles = makeStyles({
  tooltip: {
    height: 24,
  },
  views: {
    color: '#99989D', // TODO to theme
  },
})

export default UserCardDetail
