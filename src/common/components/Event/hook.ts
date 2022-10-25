import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { io } from 'socket.io-client'
import i18nCommon from 'constants/i18n'
import { NotificationDto } from 'src/common/dto'
import { getDeviceType } from 'src/common/helpers/dom'
import { getImageUrl } from 'src/common/helpers/url'
import useSnackbar from 'src/common/hooks/useSnackbar'
import useClient from 'src/common/hooks/useClient'
import { getNotificationHref } from 'src/common/helpers/notification'

export const useSocket = (): void => {
  const { locale } = useIntl()
  const client = useClient()
  const router = useRouter()
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()

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

    socket.on('notification', (notification: NotificationDto) => {
      const { id, type, details } = notification
      const { event } = i18nCommon[locale]
      const notificationSupport = 'Notification' in window

      enqueueSnackbar({ message: event, severity: 'success', icon: 'notification' })
      queryClient.invalidateQueries('notifications')

      if (!notificationSupport || document.visibilityState === 'visible') return

      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return
        const { name, avatar } = details.user
        const icon = !avatar ? undefined : getImageUrl(avatar)
        const notificationHref = getNotificationHref(notification, client)
        const tag = id.toString()
        const { [type]: body } = i18nCommon[locale]
        const notificator = new Notification(name, { tag, body, icon })

        notificator.addEventListener('click', () => router.push(notificationHref))
      })
    })

    return () => {
      socket.close()
    }
  }, [locale, queryClient])
}
