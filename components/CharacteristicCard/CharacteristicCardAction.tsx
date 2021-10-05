import { useState } from 'react'
import { Button, createStyles, makeStyles } from '@material-ui/core/'
import clsx from 'clsx'
import { MainCharacteristic } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'

export interface CharacteristicCardActionProps {
  type: 'action'
  name: MainCharacteristic
  active: boolean
}

export default function CharacteristicCardAction(props: CharacteristicCardActionProps): JSX.Element {
  const { name, active: initial } = props
  const classes = useStyles(props)
  const [active, setActive] = useState(initial)

  const onClick = () => {
    setActive(!active)
  }

  return (
    <Button
      variant="outlined"
      className={clsx(classes.button, active && classes.buttonActive)}
      key={name}
      onClick={onClick}
    >
      <AppEmoji name={name} variant="h6" className={classes.buttonContent} />
    </Button>
  )
}

const useStyles = makeStyles((theme) => {
  return createStyles({
    button: {
      width: 36,
      height: 36,
      minWidth: 'initial',
      borderColor: ({ name }: CharacteristicCardActionProps) => {
        switch (name) {
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
        background: ({ name }: CharacteristicCardActionProps) => {
          switch (name) {
            case 'motivation':
              return '#ff980033'
            case 'creativity':
              return '#be99fe4d'
            case 'support':
              return '#00a9f44d'
            default:
              return ''
          }
        },
      },
    },
    buttonActive: {
      background: ({ name }: CharacteristicCardActionProps) => {
        switch (name) {
          case 'motivation':
            return '#ff980033'
          case 'creativity':
            return '#be99fe4d'
          case 'support':
            return '#00a9f44d'
          default:
            return ''
        }
      },
    },
    buttonContent: {
      width: 20,
    },
  })
})
