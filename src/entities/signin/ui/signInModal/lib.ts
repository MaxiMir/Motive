import { getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

type Providers = Awaited<ReturnType<typeof getProviders>>

export const useProviders = () => {
  const [providers, setProviders] = useState<Providers>()

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  return providers
}

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.sign-in' }),
  }
}
