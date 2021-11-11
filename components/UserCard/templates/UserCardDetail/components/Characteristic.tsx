import { makeStyles } from '@material-ui/core'
import { UserCharacteristic } from 'dto'
import CharacteristicBase from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

interface CharacteristicProps {
  characteristic: UserCharacteristic
  value: number
  color: string
}

export default function Characteristic(props: CharacteristicProps): JSX.Element {
  const { color, characteristic } = props
  const classes = useStyles({ color })

  return (
    <AppBox flexDirection="column" spacing={0.5} width={60}>
      <AppTypography className={classes.title}>{characteristic}</AppTypography>
      <CharacteristicBase type="user" {...props} />
    </AppBox>
  )
}

const useStyles = makeStyles({
  title: {
    fontSize: '0.75rem',
    color: (props: { color: string }) => props.color,
  },
})
