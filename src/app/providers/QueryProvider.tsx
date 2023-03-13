import { ReactNode, useState } from 'react'
import { QueryClientProvider, MutationCache, QueryCache, QueryClient } from 'react-query'
import { useSnackbar } from 'shared/ui/snackbar'

interface QueryProviderProps {
  message: string
  children: ReactNode
}

function QueryProvider({ message, children }: QueryProviderProps) {
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
            enqueueSnackbar(message, { severity: 'error', icon: '☠️' })
          },
        }),
        mutationCache: new MutationCache({
          onError() {
            enqueueSnackbar(message, { severity: 'error', icon: '☠️' })
          },
        }),
      }),
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
