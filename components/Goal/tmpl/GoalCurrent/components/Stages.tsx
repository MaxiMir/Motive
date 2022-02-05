import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto } from 'dto'
import AppProgress from 'components/UI/AppProgress'

const Modal = dynamic(() => import('components/Modal'))

interface AppStagesProps {
  goal: GoalDto
  completeBtn: boolean
}

export default function Stages({ goal, completeBtn }: AppStagesProps): JSX.Element {
  const { days, stages } = goal
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <AppProgress steps={stages} current={days[0].stage} onComplete={completeBtn ? toggleModal : undefined} />
      {open && <Modal tmpl="stage" goal={goal} onClose={toggleModal} />}
    </>
  )
}
