import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Characteristic, UserDetail } from 'dto'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import { numberToShort } from 'helper/prepare'
import { useIncrementPageViews } from 'hook/useIncrementPageViews'
import { useCharacteristicColors } from 'hook/useCharacteristicColors'
import UserCardAvatar from './UserCardAvatar'
import UserCardCharacteristic from './UserCardCharacteristic'
import AppTooltip from 'components/UI/AppTooltip'
import AppBox from 'components/UI/AppBox'

const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))
const UserCardAddGoal = dynamic(() => import('./UserCardAddGoal'))

const UserCardDetail = ({
  name,
  isFavorite,
  views,
  avatar,
  characteristics,
  role,
}: UserDetail) => {
  const classes = useStyles()
  const characteristicColors = useCharacteristicColors()

  useIncrementPageViews(role)

  return (
    <Container fixed>
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
      <AppBox spacing={2} mb={3}>
        <UserCardAvatar
          avatar={avatar}
          characteristics={characteristics}
          characteristicColors={characteristicColors}
        />
        <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
          <AppBox justifyContent="space-between">
            {(['motivation', 'creativity', 'support'] as Characteristic[]).map(
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
      {role === 'OWNER' && (
        <AppBox justifyContent="center">
          <UserCardAddGoal />
        </AppBox>
      )}
    </Container>
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
