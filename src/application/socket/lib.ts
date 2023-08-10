import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useQueryClient } from 'react-query'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useDeviceContext } from 'entities/device'
import { getNotificationHref } from 'entities/page'
import { useViewer } from 'entities/viewer'
import { NotificationDto } from 'shared/api'
import { getStaticSrc } from 'shared/lib/helpers'
import { useSnackbar } from 'shared/ui/snackbar'

export function useSocket() {
  const viewer = useViewer()
  const { push } = useRouter()
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const device = useDeviceContext()

  useEffect(() => {
    if (!viewer) {
      return () => false
    }

    const socket = io(process.env.NEXT_PUBLIC_APP_URL || '', {
      auth: {
        id: viewer.id,
        device,
      },
      secure: true,
    })

    socket.on('notification', (notification: NotificationDto) => {
      const { id, type, initiator } = notification
      const message = formatMessage({ id: 'common.new-event' })
      const notificationSupport = 'Notification' in window
      enqueueSnackbar(message, { severity: 'success', icon: '🛎' })
      queryClient.invalidateQueries('notifications')

      if (!notificationSupport || document.visibilityState === 'visible') return

      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return
        const { name, avatar } = initiator
        const icon = !avatar ? undefined : getStaticSrc(avatar)
        const notificationHref = getNotificationHref(notification, viewer.nickname)
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
