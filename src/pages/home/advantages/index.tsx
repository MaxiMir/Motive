import { Advantage } from './advantage'
import { ADVANTAGES } from './consts'

export function Advantages() {
  return (
    <>
      {ADVANTAGES.map(({ name, href }) => (
        <Advantage name={name} href={href} key={name} />
      ))}
    </>
  )
}
