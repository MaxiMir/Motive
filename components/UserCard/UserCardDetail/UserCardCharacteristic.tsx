import { makeStyles } from '@material-ui/core/styles'
import { CharacteristicCardUserProps } from 'components/CharacteristicCard/CharacteristicCardUser'
import CharacteristicCard from 'components/CharacteristicCard'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

const UserCardCharacteristic = (props: CharacteristicCardUserProps): JSX.Element => {
  const { color, characteristic } = props
  const classes = useStyles({ color })

  return (
    <AppBox flexDirection="column" spacing={0.5} width={60}>
      <AppTypography className={classes.title}>{characteristic}</AppTypography>
      <CharacteristicCard {...props} />
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
