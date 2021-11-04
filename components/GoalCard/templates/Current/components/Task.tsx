import dynamic from 'next/dynamic'
import { Task as TaskDTO } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppTypography from 'components/UI/AppTypography'

const TaskDate = dynamic(() => import('./TaskDate'))

export default function Task({ name, date }: TaskDTO): JSX.Element {
  return (
    <>
      <AppBox alignItems="center" spacing={1}>
        <AppEmoji name="energy" variant="h6" />
        <AppTypography variant="subtitle1">{name}</AppTypography>
      </AppBox>
      {date && <TaskDate date={date} />}
    </>
  )
}
