import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { io } from 'socket.io-client'
import { ClientDto } from 'dto'

export const useEvents = (client: ClientDto): void => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_APP_URL || '', {
      secure: true,
      auth: {
        id: client.id,
      },
    })

    socket.on('notification', (e: any) => {
      queryClient.invalidateQueries('notifications')
      console.log(e)
    })

    return () => {
      socket.close()
    }
  }, [client?.id, queryClient])
}
