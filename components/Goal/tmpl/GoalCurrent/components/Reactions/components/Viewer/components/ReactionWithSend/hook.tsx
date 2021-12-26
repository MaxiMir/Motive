import { useRef, useState } from 'react'
import { MainCharacteristicName } from 'dto'
import DayService from 'services/DayService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSnackbar from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'

export default function useSetReaction(
  dayId: number,
  name: MainCharacteristicName,
  initial: boolean,
  onSet: (characteristic: MainCharacteristicName, increase: boolean) => void,
): [boolean, () => void] {
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
    lastLoadedRef.current !== value && send({ id: dayId, name, active: value })
  })

  const onChange = () => {
    setActive(!active)
    sendWithDebounce(!active)
  }

  return [active, onChange]
}
