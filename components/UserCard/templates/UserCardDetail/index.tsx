import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useMediaQuery, useTheme, makeStyles, createStyles } from '@material-ui/core'
import { Client, UserDetail, UserCharacteristic } from 'dto'
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

export interface UserCardDetailProps extends UserDetail {
  type: 'detail'
  client: Client
}

export default function UserCardDetail({
  id,
  name,
  favorite,
  views,
  avatar,
  characteristics,
  role,
  goals,
  client,
}: UserCardDetailProps): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const { query } = useRouter()
  const characteristicColors = useCharacteristicColors()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isOwner = role === 'OWNER'

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
          {!isOwner && client.isAuthenticated && <Favorite id={id} favorite={favorite} />}
        </AppBox>
        <AppBox alignItems="center" spacing={0.5}>
          <AppTooltip title="Page Views" className={classes.tooltip}>
            <Image src="/images/eye.png" alt="" width={39} height={24} />
          </AppTooltip>
          <AppTypography variant="subtitle1" component="p" className={classes.views}>
            {numberToShort(views)}
          </AppTypography>
        </AppBox>
      </AppBox>
      <AppBox flexDirection="column" spacing={3} flex={1}>
        <AppBox spacing={isMobile ? 1 : 4}>
          <Avatar avatar={avatar} characteristics={characteristics} characteristicColors={characteristicColors} />
          <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
            <AppBox justifyContent="space-between">
              {(['motivation', 'creativity', 'support'] as UserCharacteristic[]).map((type) => (
                <Characteristic
                  characteristic={type}
                  value={characteristics[type]}
                  color={characteristicColors[type].fontColor}
                  key={type}
                />
              ))}
            </AppBox>
            <AppBox justifyContent="space-between">
              {(['completed', 'awards', 'abandoned'] as UserCharacteristic[]).map((type) => (
                <Characteristic
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
            <AddGoal />
          </AppBox>
        )}
        {!goals.length ? (
          <EmptyGoals isOwner={isOwner} />
        ) : (
          <AppBox flexWrap="wrap" spacing={3}>
            {goals.map((goal) => (
              <GoalCard type="current" goal={goal} client={client} href={`/${id}`} key={goal.id} />
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
