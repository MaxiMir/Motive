import Slogan from './components/Slogan/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helpers/advantages'

function HomeFeature() {
  return (
    <>
      <Slogan />
      {ADVANTAGES.map(({ name, href }) => (
        <Advantage name={name} href={href} key={name} />
      ))}
    </>
  )
}

export default HomeFeature
