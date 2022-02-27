import { useContext } from 'react'
import { ModalSignInContext } from 'context/modalSignInContext'

export default function useSignInModal(): () => void {
  const { toggle } = useContext(ModalSignInContext)

  return toggle
}
