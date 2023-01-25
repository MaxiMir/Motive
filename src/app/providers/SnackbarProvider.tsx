import { ReactNode, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { SnackbarState, SnackbarContext } from '@entities/snackbar'

const Snackbar = dynamic(() => import('@shared/ui/Snackbar'))

interface SignInProviderProps {
  children: ReactNode
}

function SnackbarProvider({ children }: SignInProviderProps) {
  const [state, setState] = useState<SnackbarState | null>(null)
  const value = useMemo(() => ({ state, setState }), [state])

  const onCloseSnackbar = () => setState(null)

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {state && <Snackbar {...state} onClose={onCloseSnackbar} />}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider