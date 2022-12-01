import { useEffect, useState } from 'react'
import { getProviders } from 'next-auth/react'

type Providers = Awaited<ReturnType<typeof getProviders>>

const useProviders = () => {
  const [providers, setProviders] = useState<Providers>()

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return providers
}

export default useProviders
