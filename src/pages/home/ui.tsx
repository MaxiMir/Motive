import { Advantage } from './advantage'
import { ADVANTAGES } from './consts'
import { Slogan } from './slogan'

function HomePage() {
  return (
    <>
      <Slogan />
      {ADVANTAGES.map(({ name, href }) => (
        <Advantage name={name} href={href} key={name} />
      ))}
    </>
  )
}

export default HomePage
