import { useEffect, useState } from 'react'
import { UserBaseDto } from 'dto'
import { parseJSON } from 'helpers/prepare'

export default function useStorageClient(): UserBaseDto | undefined {
  const [client, setClient] = useState<UserBaseDto>()

  useEffect(() => {
    const storageClient = localStorage.getItem('client')
    const parsedClient = storageClient && parseJSON(storageClient)

    parsedClient && setClient(parsedClient as UserBaseDto)
  }, [])

  return client
}
