import { Fragment } from 'react'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import { Characteristic, User } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import CharacteristicUser from 'components/Characteristic/CharacteristicUser'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppDot from 'components/UI/AppDot'
import AppTypography from 'components/UI/AppTypography'
import UserCardMenu from './UserCardMenu'

const CHARACTERISTICS: Characteristic[] = ['motivation', 'creativity', 'support', 'completed']
const LAST_CHARACTERISTIC_INDEX = 3

const UserCardFavorite = ({ id, avatar, href, name, characteristics }: User): JSX.Element => {
  const colors = useCharacteristicColors()
  const classes = useStyles()

  return (
    <AppBox spacing={1}>
      <AppLink href={href} className={classes.avatarLink}>
        <Image src={avatar} width={55} height={55} alt="avatar" className={classes.avatar} />
      </AppLink>
      <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
        <AppBox justifyContent="space-between" alignItems="center">
          <AppLink href={href}>
            <AppTypography variant="subtitle1" component="p">
              {name}
            </AppTypography>
          </AppLink>
          <UserCardMenu id={id} title={name} href={href} />
        </AppBox>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristic, index) => (
            <Fragment key={characteristic}>
              <CharacteristicUser
                characteristic={characteristic}
                value={characteristics[characteristic]}
                color={colors[characteristic].fontColor}
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

export default UserCardFavorite
