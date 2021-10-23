import { Button, createStyles, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { MainCharacteristic } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

export interface CharacteristicCardActionProps {
  type: 'action'
  characteristic: MainCharacteristic
  active: boolean
  onClick: () => void
}

export default function CharacteristicCardAction({
  characteristic,
  active,
  onClick,
}: CharacteristicCardActionProps): JSX.Element {
  const classes = useStyles({ characteristic })

  return (
    <Button variant="outlined" className={clsx(classes.button, active && classes.buttonActive)} onClick={onClick}>
      <AppEmoji name={characteristic} variant="h6" className={classes.buttonContent} />
    </Button>
  )
}

const useStyles = makeStyles((theme) => {
  return createStyles({
    button: {
      width: 36,
      height: 36,
      minWidth: 'initial',
      borderColor: ({ characteristic }: { characteristic: MainCharacteristic }) => {
        switch (characteristic) {
          case 'motivation':
            return theme.palette.warning.main
          case 'creativity':
            return theme.palette.success.main
          case 'support':
            return theme.palette.info.main
          default:
            return ''
        }
      },
      '&:hover': {
        background: getBackground,
      },
    },
    buttonActive: {
      background: getBackground,
    },
    buttonContent: {
      width: 20,
    },
  })
})

const getBackground = ({ characteristic }: { characteristic: MainCharacteristic }): string => {
  switch (characteristic) {
    case 'motivation':
      return '#ff980033'
    case 'creativity':
      return '#be99fe4d'
    case 'support':
      return '#00a9f44d'
    default:
      return ''
  }
}
