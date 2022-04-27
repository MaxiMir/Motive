import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { io } from 'socket.io-client'
import i18n from 'constants/i18n'
import { NotificationDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useLocale from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import { getNotificationInfo } from 'components/Notification/NotificationModal/helper'

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
      },
      secure: true,
    })

    socket.on('notification', (notification: NotificationDto) => {
      const { event } = i18n[locale]
      const { emoji } = getNotificationInfo(notification.type)
      enqueueSnackbar({ message: event, severity: 'success', icon: emoji })
      queryClient.invalidateQueries('notifications')
    })

    return () => {
      socket.close()
    }
  }, [locale, queryClient])
}
