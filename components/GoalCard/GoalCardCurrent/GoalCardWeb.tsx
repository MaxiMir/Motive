import Image from 'next/image'
import AppBox from 'components/UI/AppBox'

export default function GoalCardWeb(): JSX.Element {
  return (
    <AppBox position="absolute" right={16} top={48}>
      <Image src="/images/svg/web.svg" alt="Pita's web" width={211} height={202} />
    </AppBox>
  )
}
