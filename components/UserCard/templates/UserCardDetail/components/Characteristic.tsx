import { makeStyles } from '@material-ui/core/styles'
import { UserProps } from 'components/Characteristic/templates/CharacteristicUser'
import CharacteristicBase from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

export default function Characteristic(props: UserProps): JSX.Element {
  const { color, characteristic } = props
  const classes = useStyles({ color })

  return (
    <AppBox flexDirection="column" spacing={0.5} width={60}>
      <AppTypography className={classes.title}>{characteristic}</AppTypography>
      <CharacteristicBase {...props} />
    </AppBox>
  )
}

const useStyles = makeStyles({
  title: {
    fontSize: '0.75rem',
    color: (props: { color: string }) => props.color,
  },
})
