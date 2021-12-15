import { Fragment } from 'react'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { User, UserCharacteristicName } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import Characteristic from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppDot from 'components/UI/AppDot'
import AppTypography from 'components/UI/AppTypography'
import Menu from './components/Menu'

const CHARACTERISTICS: UserCharacteristicName[] = ['motivation', 'creativity', 'support', 'completed']
const LAST_CHARACTERISTIC_INDEX = 3

export interface UserCardFavoriteProps {
  tmpl: 'favorite'
  user: User
  onRemove: () => void
}

export default function UserCardFavorite({ user, onRemove }: UserCardFavoriteProps): JSX.Element {
  const { nickname, avatar, name, characteristic } = user
  const classes = useStyles()
  const colors = useCharacteristicColors()
  const href = `/${nickname}`

  return (
    <AppBox spacing={1}>
      <AppLink href={href} className={classes.avatarLink}>
        <Image src={avatar} width={55} height={55} alt="" className={classes.avatar} />
      </AppLink>
      <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
        <AppBox justifyContent="space-between" alignItems="center">
          <AppLink href={href}>
            <AppTypography variant="subtitle1" component="p">
              {name}
            </AppTypography>
          </AppLink>
          <Menu title={name} href={href} onRemove={onRemove} />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName, index) => (
            <Fragment key={characteristicName}>
              <Characteristic
                tmpl="user"
                name={characteristicName}
                value={characteristic[characteristicName]}
                color={colors[characteristicName].fontColor}
              />
              {index !== LAST_CHARACTERISTIC_INDEX && <AppDot />}
            </Fragment>
          ))}
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  avatarLink: {
    width: 55,
    height: 55,
  },
  avatar: {
    borderRadius: '50%',
  },
})
