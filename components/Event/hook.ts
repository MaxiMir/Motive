import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { io } from 'socket.io-client'
import i18n from 'constants/i18n'
import { NotificationDto } from 'dto'
import { getDeviceType } from 'helpers/dom'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'

export const useEvent = (): void => {
  const client = useClient()
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()
  const { locale } = useLocale()

  useEffect(() => {
    if (!client) {
      return () => false
    }

    const socket = io(process.env.NEXT_PUBLIC_APP_URL || '', {
      auth: {
        id: client.id,
        device: getDeviceType(),
      },
      secure: true,
    })

    socket.on('notification', (_: NotificationDto) => {
      const { event } = i18n[locale]

      enqueueSnackbar({ message: event, severity: 'success', icon: 'notification' })
      queryClient.invalidateQueries('notifications')
    })

    return () => {
      socket.close()
    }
  }, [locale, queryClient])
}
