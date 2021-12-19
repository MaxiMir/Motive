import { makeStyles } from '@material-ui/core'
import { UserCharacteristicName } from 'dto'
import CharacteristicBase from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

interface CharacteristicProps {
  name: UserCharacteristicName
  value: number
  color: string
}

export default function Characteristic(props: CharacteristicProps): JSX.Element {
  const { color, name } = props
  const classes = useStyles({ color })

  return (
    <AppBox flexDirection="column" spacing={0.5} width={60}>
      <AppTypography className={classes.title}>{name}</AppTypography>
      <CharacteristicBase tmpl="user" {...props} />
    </AppBox>
  )
}

const useStyles = makeStyles({
  title: {
    fontSize: '0.75rem',
    color: (props: { color: string }) => props.color,
  },
})
