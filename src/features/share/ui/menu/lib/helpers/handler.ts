import { SHARERS } from 'features/share/ui/menu/consts/sharers'

type ShareType = keyof typeof SHARERS

export const clickHandler = (type: ShareType, title: string, url: string): void => {
  const { shareUrl, isLink } = SHARERS[type](url, title)

  if (isLink) {
    window.location.href = shareUrl
    return
  }

  window.open(shareUrl, '_blank')
}
