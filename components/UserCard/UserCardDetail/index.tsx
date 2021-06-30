import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Characteristic, UserDetail } from 'dto'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { numberToShort } from 'helper/prepare'
import { useIncrementPageViews } from 'hook/useIncrementPageViews'
import { useCharacteristicColors } from 'hook/useCharacteristicColors'
import UserCardAvatar from './UserCardAvatar'
import UserCardCharacteristic from './UserCardCharacteristic'
import UserCardEmptyGoals from './UserCardEmptyGoals'
import AppTooltip from 'components/UI/AppTooltip'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'

const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardAddGoal = dynamic(() => import('./UserCardAddGoal'))

const UserCardDetail = ({
  name,
  isFavorite,
  views,
  avatar,
  characteristics,
  role,
  goals,
}: UserDetail) => {
  const classes = useStyles()
  const characteristicColors = useCharacteristicColors()
  const isOwner = role === 'OWNER'

  useIncrementPageViews(role)

  return (
    <AppContainer withFlexColumn>
      <AppBox justifyContent="space-between" mb={2}>
        <AppBox alignItems="center">
          <Typography variant="h6" component="h1">
            {name}
          </Typography>
          {isFavorite !== undefined && (
            <UserCardFavorite isFavorite={isFavorite} />
          )}
        </AppBox>
        <AppBox alignItems="center" spacing={0.5}>
          <AppTooltip title="Page Views" className={classes.tooltip}>
            <Image src="/images/eye.png" alt="eye" width={39} height={24} />
          </AppTooltip>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.views}
          >
            {numberToShort(views)}
          </Typography>
        </AppBox>
      </AppBox>
      <AppBox flexDirection="column" spacing={3} flex={1}>
        <AppBox spacing={2}>
          <UserCardAvatar
            avatar={avatar}
            characteristics={characteristics}
            characteristicColors={characteristicColors}
          />
          <AppBox
            flexDirection="column"
            justifyContent="space-between"
            flex={1}
          >
            <AppBox justifyContent="space-between">
              {(
                ['motivation', 'creativity', 'support'] as Characteristic[]
              ).map((type, index) => (
                <UserCardCharacteristic
                  characteristic={type}
                  value={characteristics[type]}
                  color={characteristicColors[type].fontColor}
                  key={index}
                />
              ))}
            </AppBox>
            <AppBox justifyContent="space-between">
              {(['abandoned', 'completed'] as Characteristic[]).map(
                (type, index) => (
                  <UserCardCharacteristic
                    characteristic={type}
                    value={characteristics[type]}
                    color={characteristicColors[type].fontColor}
                    key={index}
                  />
                ),
              )}
            </AppBox>
          </AppBox>
        </AppBox>
        {isOwner && (
          <AppBox justifyContent="center">
            <UserCardAddGoal />
          </AppBox>
        )}
        {!goals.length && <UserCardEmptyGoals isOwner={isOwner} />}
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
