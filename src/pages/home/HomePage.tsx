import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import { ADVANTAGES } from './helpers/content'

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
