import { useEffect, useState } from 'react'
import { getProviders } from 'next-auth/react'

type Providers = Awaited<ReturnType<typeof getProviders>>

export const useProviders = () => {
  const [providers, setProviders] = useState<Providers>()

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return providers
}
