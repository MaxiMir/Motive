import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import { Characteristic, Client, Goal, UserDetail } from 'dto'
import ROUTE from 'route'
import Axios from 'lib/axios'
import { changeQueryParam, numberToShort } from 'helpers/prepare'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { useSnackbar } from 'hooks/useSnackbar'
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
}

const queryFn = async (id: string) => await Axios.put(ROUTE.getUser(id))

const UserCardDetail = ({
  id,
  name,
  favorite,
  views,
  avatar,
  characteristics,
  owner,
  goals: goalsInit,
  client,
}: UserCardDetailProps): JSX.Element => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const characteristicColors = useCharacteristicColors()
  const [goals, setGoals] = useState(goalsInit)
  useQuery('page-views', () => queryFn(id), { refetchOnWindowFocus: false, enabled: !owner })

  const onAdd = async (goal: Goal) => {
    setGoals([...goals, goal])
    await router.push(changeQueryParam(router.asPath, 'goal', goal.id), undefined, { shallow: true })
    enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: '💎' })
  }

  useEffect(() => {
    const elem = router.query.goal && document.getElementById(`goal-${router.query.goal}`)
    elem && elem.scrollIntoView({ behavior: 'smooth' })
  }, [id, router.query])

  useEffect(() => {
    setGoals(goalsInit)
  }, [goalsInit])

  return (
    <AppContainer withFlexColumn>
      <AppBox justifyContent="space-between" mb={2} height={52}>
        <AppBox alignItems="center">
          <AppTypography variant="h5" component="h1">
            {name}
          </AppTypography>
          {!owner && client.isAuthenticated && <UserCardFavorite id={id} favorite={favorite} />}
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
              {(['motivation', 'creativity', 'support'] as Characteristic[]).map((type) => (
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
              {(['abandoned', 'completed'] as Characteristic[]).map((type) => (
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
        {owner && (
          <AppBox justifyContent="center">
            <UserCardAddGoal onAdd={onAdd} />
          </AppBox>
        )}
        {!goals.length ? (
          <UserCardEmptyGoals owner={owner} />
        ) : (
          <AppList
            elements={goals}
            keyGetter={(goal) => goal.id}
            spacing={3}
            render={(goal) => <GoalCard type="current" {...goal} />}
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
    color: '#99989D',
  },
})

export default UserCardDetail
