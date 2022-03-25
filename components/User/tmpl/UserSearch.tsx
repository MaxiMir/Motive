import { Button, makeStyles } from '@material-ui/core'
import { UserCharacteristicName, UserDto } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import AppAvatar from 'components/UI/AppAvatar'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { getUserHref } from 'views/UserView/helper'
import Characteristic from 'components/Characteristic'

const CHARACTERISTICS: UserCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface UserSearchProps {
  tmpl: 'search'
  user: UserDto
}

export default function UserSearch({ user }: UserSearchProps): JSX.Element {
  const classes = useStyles()
  const { nickname, avatar, name, characteristic } = user
  const colors = useCharacteristicColors()
  const href = getUserHref(nickname)

  return (
    <Button variant="outlined" color="primary" href={href} className={classes.button}>
      <AppBox flexDirection="column" alignItems="center" spacing={2}>
        <AppAvatar src={avatar} size={120} />
        <AppTypography>{name}</AppTypography>
        <AppBox justifyContent="space-between" alignItems="center">
          {CHARACTERISTICS.map((characteristicName) => (
            <Characteristic
              tmpl="user"
              name={characteristicName}
              value={characteristic[characteristicName]}
              color={colors[characteristicName].fontColor}
              key={characteristicName}
            />
          ))}
        </AppBox>
      </AppBox>
    </Button>
  )
}

const useStyles = makeStyles({
  button: {
    width: '100%',
    textTransform: 'none',
    padding: 16,
    borderRadius: 12,
  },
})
