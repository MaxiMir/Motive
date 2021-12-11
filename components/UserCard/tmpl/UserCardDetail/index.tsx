import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useMediaQuery, useTheme, makeStyles, createStyles } from '@material-ui/core'
import { Client, UserDetail, UserCharacteristicName } from 'dto'
import { numberToShort } from 'helpers/prepare'
import { scrollToElem } from 'helpers/dom'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppTooltip from 'components/UI/AppTooltip'
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
  client: Client
}

export default function UserCardDetail({ user, client }: UserCardDetailProps): JSX.Element {
  const { id, name, favorite, views, avatar, characteristic, role, goals } = user
  const classes = useStyles()
  const theme = useTheme()
  const { query } = useRouter()
  const characteristicColors = useCharacteristicColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isOwner = role === 'OWNER'
  const showFavorite = !isOwner && client.isAuthenticated
  const shortViews = numberToShort(views)

  useEffect(() => {
    query.s && scrollToElem(`goal-${query.s}`)
  }, [query])

  return (
    <AppContainer withFlexColumn>
      <AppBox justifyContent="space-between" mb={2}>
        <AppBox alignItems="center" spacing={1}>
          <AppTypography variant="h5" component="h1">
            {name}
          </AppTypography>
          {showFavorite && <Favorite id={id} favorite={favorite} />}
        </AppBox>
        <AppBox alignItems="center" spacing={0.5}>
          <AppTooltip title="Page Views" className={classes.tooltip}>
            <Image src="/images/eye.png" alt="" width={39} height={24} />
          </AppTooltip>
          <AppTypography variant="subtitle1" component="p" className={classes.views}>
            {shortViews}
          </AppTypography>
        </AppBox>
      </AppBox>
      <AppBox flexDirection="column" spacing={3} flex={1}>
        <AppBox spacing={isMobile ? 1 : 4}>
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
              <GoalCard tmpl="current" goal={goal} client={client} href={`/${id}`} key={goal.id} />
            ))}
          </AppBox>
        )}
      </AppBox>
    </AppContainer>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    tooltip: {
      height: 24,
    },
    views: {
      color: theme.text.silent,
    },
  }),
)
