import CharacteristicUser, { CharacteristicUserProps } from 'components/Characteristic/CharacteristicUser'
import { makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

const UserCardCharacteristic = (props: CharacteristicUserProps): JSX.Element => {
  const { color, characteristic } = props
  const classes = useStyles({ color })

  return (
    <AppBox flexDirection="column" spacing={0.5} width={60}>
      <AppTypography className={classes.title}>{characteristic}</AppTypography>
      <CharacteristicUser {...props} />
    </AppBox>
  )
}

const useStyles = makeStyles({
  title: {
    fontSize: '0.75rem',
    color: (props: { color: string }) => props.color,
  },
})

export default UserCardCharacteristic