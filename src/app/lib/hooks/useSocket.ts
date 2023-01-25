import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import { io } from 'socket.io-client'
import { getImageSrc } from '@lib/helpers/url'
import useClient from '@lib/hooks/useClient'
import { useSnackbar } from '@entities/snackbar'
import { NotificationDto, getNotificationHref } from '@entities/notification'
import { useDeviceContext } from '@entities/device'

export const useSocket = () => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const device = useDeviceContext()

  useEffect(() => {
    if (!client) {
      return () => false
    }

    const socket = io(process.env.NEXT_PUBLIC_APP_URL || '', {
      auth: {
        id: client.id,
        device,
      },
      secure: true,
    })

    socket.on('notification', (notification: NotificationDto) => {
      const { id, type, details } = notification
      const message = formatMessage({ id: 'common.new-event' })
      const notificationSupport = 'Notification' in window
      enqueueSnackbar({ message, severity: 'success', icon: 'notification' })
      queryClient.invalidateQueries('notifications')

      if (!notificationSupport || document.visibilityState === 'visible') return

      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return
        const { name, avatar } = details.user
        const icon = !avatar ? undefined : getImageSrc(avatar)
        const notificationHref = getNotificationHref(notification, client)
        const tag = id.toString()
        const body = formatMessage({ id: `component.notification.${type}` })
        const notificator = new Notification(name, { tag, body, icon })
        notificator.addEventListener('click', () => push(notificationHref))
      })
    })

    return () => {
      socket.close()
    }
  }, [device, queryClient])
}
