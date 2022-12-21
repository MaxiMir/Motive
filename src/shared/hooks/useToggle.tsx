import { useState } from 'react'

type UseToggle = () => [open: boolean, toggle: () => void]

const useToggle: UseToggle = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return [open, toggle]
}

export default useToggle
