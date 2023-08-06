import { ADVANTAGES, Advantage } from 'pages/home/advantages'
import { Slogan } from './slogan'

export function HomePage() {
  return (
    <>
      <Slogan />
      {ADVANTAGES.map((name) => (
        <Advantage name={name} key={name} />
      ))}
    </>
  )
}
