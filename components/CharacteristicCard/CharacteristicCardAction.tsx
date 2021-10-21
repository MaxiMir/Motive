import { useRef, useState } from 'react'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { MainCharacteristic } from 'dto'
import DayService from 'services/DayService'
import useDebounceCb from 'hooks/useDebounceCb'
import { useSnackbar } from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import AppEmoji from 'components/UI/AppEmoji'

export interface CharacteristicCardActionProps {
  type: 'action'
  dayId: string
  characteristic: MainCharacteristic
  active: boolean
  onSet: (characteristic: MainCharacteristic, increase: boolean) => void
}

export default function CharacteristicCardAction({
  dayId,
  characteristic,
  active: initial,
  onSet,
}: CharacteristicCardActionProps): JSX.Element {
  const classes = useStyles({ characteristic })
  const lastLoadedRef = useRef(initial)
  const [active, setActive] = useState(initial)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(DayService.setCharacteristic, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.active

      onSet(characteristic, data.active)
      data.active &&
        enqueueSnackbar({
          message: `You have increased goal's ${characteristic} points`,
          severity: 'success',
          icon: 'magic',
        })
    },
    onError(_, data) {
      setActive(!data.active)
    },
  })
  const sendWithDebounce = useDebounceCb((isActive: boolean) => {
    lastLoadedRef.current !== isActive && send({ dayId, characteristic, active: isActive })
  })

  const onClick = () => {
    setActive(!active)
    sendWithDebounce(!active)
  }

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
