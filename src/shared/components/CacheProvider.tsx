import { ReactNode, useState } from 'react'
import { QueryClientProvider, MutationCache, QueryCache, QueryClient } from 'react-query'
import { useSnackbar } from '@features/snackbar'

interface CacheProviderProps {
  message: string
  children: ReactNode
}

function CacheProvider({ message, children }: CacheProviderProps) {
  const { enqueueSnackbar } = useSnackbar()
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
          },
        },
        queryCache: new QueryCache({
          onError() {
            enqueueSnackbar({ message, severity: 'error', icon: 'error' })
          },
        }),
        mutationCache: new MutationCache({
          onError() {
            enqueueSnackbar({ message, severity: 'error', icon: 'error' })
          },
        }),
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default CacheProvider
