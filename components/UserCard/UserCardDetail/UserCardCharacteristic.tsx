import UserCharacteristic, {
  UserCharacteristicProps,
} from 'components/UserCharacteristic'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import AppBox from 'components/UI/AppBox'

const UserCardCharacteristic = (props: UserCharacteristicProps) => {
  const classes = useStyles({ color: props.color })

  return (
    <AppBox flexDirection="column" spacing={0.5}>
      <Typography className={classes.title}>{props.characteristic}</Typography>
      <UserCharacteristic {...props} />
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
