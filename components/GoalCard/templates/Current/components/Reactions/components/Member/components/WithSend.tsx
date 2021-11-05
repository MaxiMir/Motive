import { useRef, useState } from 'react'
import { MainCharacteristic } from 'dto'
import DayService from 'services/DayService'
import useDebounceCb from 'hooks/useDebounceCb'
import { useSnackbar } from 'hooks/useSnackbar'
import useSend from 'hooks/useSend'
import CharacteristicCard from 'components/CharacteristicCard'

interface DefaultProps {
  dayId: string
  characteristic: MainCharacteristic
  active: boolean
  onSet: (characteristic: MainCharacteristic, increase: boolean) => void
}

export default function WithSend({ dayId, characteristic, active: initial, onSet }: DefaultProps): JSX.Element {
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
  const sendWithDebounce = useDebounceCb((value: boolean) => {
    lastLoadedRef.current !== value && send({ dayId, characteristic, active: value })
  })

  const onClick = () => {
    setActive(!active)
    sendWithDebounce(!active)
  }

  return <CharacteristicCard type="reaction" characteristic={characteristic} active={active} onClick={onClick} />
}
