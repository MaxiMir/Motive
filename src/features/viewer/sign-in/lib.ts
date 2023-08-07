import { getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'

type Providers = Awaited<ReturnType<typeof getProviders>>

export function useProviders() {
  const [providers, setProviders] = useState<Providers>()

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return providers
}
