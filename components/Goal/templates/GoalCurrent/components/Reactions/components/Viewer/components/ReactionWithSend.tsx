import { useRef, useState } from 'react'
import { MainCharacteristic } from 'dto'
import DayService from 'services/DayService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import Reaction from './Reaction'

interface ReactionWithSendProps {
  dayId: string
  name: MainCharacteristic
  active: boolean
  onSet: (characteristic: MainCharacteristic, increase: boolean) => void
}

export default function ReactionWithSend({ dayId, name, active: initial, onSet }: ReactionWithSendProps): JSX.Element {
  const lastLoadedRef = useRef(initial)
  const [active, setActive] = useState(initial)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(DayService.updateCharacteristic, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.active

      onSet(name, data.active)
      data.active &&
        enqueueSnackbar({
          message: `You have increased goal's ${name} points`,
          severity: 'success',
          icon: 'magic',
        })
    },
    onError(_, data) {
      setActive(!data.active)
    },
  })
  const sendWithDebounce = useDebounceCb((value: boolean) => {
    lastLoadedRef.current !== value && send({ dayId, name, active: value })
  })
  const title = `${active ? 'Decrease' : 'Increase'} goal's ${name} points`

  const onClick = () => {
    setActive(!active)
    sendWithDebounce(!active)
  }

  return <Reaction name={name} active={active} title={title} onClick={onClick} />
}
