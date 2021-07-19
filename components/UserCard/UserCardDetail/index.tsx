import dynamic from 'next/dynamic'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Characteristic, UserDetail } from 'dto'
import { numberToShort } from 'helpers/prepare'
import useIncrementPageViews from 'hooks/useIncrementPageViews'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppTooltip from 'components/UI/AppTooltip'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import AppTypography from 'components/UI/AppTypography'
import UserCardFavorite from './UserCardFavorite'
import UserCardAvatar from './UserCardAvatar'
import UserCardCharacteristic from './UserCardCharacteristic'
import UserCardEmptyGoals from './UserCardEmptyGoals'

const UserCardAddGoal = dynamic(() => import('./UserCardAddGoal'))

const UserCardDetail = ({
  id,
  name,
  isFavorite,
  views,
  avatar,
  characteristics,
  role,
  goals,
}: UserDetail): JSX.Element => {
  const classes = useStyles()
  const characteristicColors = useCharacteristicColors()
  const isOwner = role === 'OWNER'

  useIncrementPageViews(role)

  return (
    <AppContainer withFlexColumn>
      <AppBox justifyContent="space-between" mb={2}>
        <AppBox alignItems="center">
          <AppTypography variant="h5" component="h1">
            {name}
          </AppTypography>
          {!isOwner && <UserCardFavorite id={id} isFavorite={isFavorite} />}
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
