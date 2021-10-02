import { Button, createStyles, makeStyles } from '@material-ui/core/'
import clsx from 'clsx'
import { MainCharacteristic } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

export interface CharacteristicCardActionProps {
  type: 'action'
  name: MainCharacteristic
}

export default function CharacteristicCardAction({ name }: CharacteristicCardActionProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button variant="outlined" className={clsx(classes.button, classes[name])} key={name}>
      <AppEmoji name={name} variant="h6" className={classes.buttonText} />
    </Button>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      width: 36,
      height: 36,
      minWidth: 'initial',
    },
    buttonText: {
      width: 20,
    },
    motivation: {
      borderColor: theme.palette.warning.main,
      '&:hover': {
        background: '#ff980033',
      },
    },
    creativity: {
      borderColor: theme.palette.success.main,
      '&:hover': {
        background: '#be99fe4d',
      },
    },
    support: {
      borderColor: theme.palette.info.main,
      '&:hover': {
        background: '#00a9f44d',
      },
    },
  }),
)
