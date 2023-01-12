import { useState } from 'react'
import { MutationCache, QueryCache, QueryClient } from 'react-query'
import { useSnackbar } from '@features/snackbar'

export const useQueryClient = (message: string) => {
  const [enqueueSnackbar] = useSnackbar()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
        queryCache: new QueryCache({
          onError() {
            enqueueSnackbar({ message, severity: 'error' })
          },
        }),
        mutationCache: new MutationCache({
          onError() {
            enqueueSnackbar({ message, severity: 'error' })
          },
        }),
      }),
  )

  return queryClient
}
