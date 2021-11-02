import { useState } from 'react'
import { MainCharacteristic } from 'dto'
import CharacteristicCard from 'components/CharacteristicCard'

interface GoalCardActionsMemberSupportProps {
  characteristic: MainCharacteristic
  active: boolean
}

export default function GoalCardActionsMemberSupport({
  characteristic,
  active: initial,
}: GoalCardActionsMemberSupportProps): JSX.Element {
  const [active, setActive] = useState(initial)

  const onClick = () => {
    setActive(!active)
  }

  return <CharacteristicCard type="action" characteristic={characteristic} active={active} onClick={onClick} />
}
