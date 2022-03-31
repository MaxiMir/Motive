import Image from 'next/image'
import AppBox from 'components/UI/AppBox'

export default function Web(): JSX.Element {
  return (
    <AppBox position="absolute" right={16} top={48}>
      <Image src="/images/svg/web.svg" alt="Pitt's web" width={211} height={202} priority />
    </AppBox>
  )
}
