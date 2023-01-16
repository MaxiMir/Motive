import { ReactNode, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { SnackbarContext } from '@features/snackbar/context'
import { SnackbarState } from '@features/snackbar/types'

const AppSnackbar = dynamic(() => import('@ui/AppSnackbar'))

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
      {state && <AppSnackbar {...state} onClose={onCloseSnackbar} />}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
