import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helper'

export default function HomeView() {
  return (
    <>
      <Slogan />
      {ADVANTAGES.map(({ name, href }) => (
        <Advantage name={name} href={href} key={name} />
      ))}
    </>
  )
}
