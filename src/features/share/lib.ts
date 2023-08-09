import { setSearchParams } from 'shared/lib/helpers'

export function tryNativeShare(
  href: string,
  title: string,
  onNotSupported: () => void,
): Promise<void> {
  if (!navigator.canShare) {
    return Promise.resolve().then(onNotSupported)
  }

  const url = process.env.NEXT_PUBLIC_APP_URL + href

  return navigator.share({ url, title }).catch(() => undefined) // then for AbortError: Abort due to cancellation of share.
}

const HASHTAG = process.env.NEXT_PUBLIC_APP_NAME as string

const SHARERS = {
  facebook: (u: string, quote: string) => ({
    shareUrl: setSearchParams('https://www.facebook.com/sharer/sharer.php', {
      u,
      quote,
      hashtag: HASHTAG,
    }),
    isLink: false,
  }),
  twitter: (url: string, text: string) => ({
    shareUrl: setSearchParams('https://twitter.com/intent/tweet/', {
      url,
      text,
      hashtags: HASHTAG,
    }),
    isLink: false,
  }),
  telegram: (url: string, text: string) => ({
    shareUrl: setSearchParams('tg://msg_url', {
      url,
      text,
    }),
    isLink: true,
  }),
  vk: (url: string, title: string) => ({
    shareUrl: setSearchParams('https://vk.com/share.php', {
      url,
      title,
    }),
    isLink: false,
  }),
  email: (url: string, title: string) => ({
    shareUrl: setSearchParams('mailto:', {
      subject: HASHTAG,
      body: `Hey! Check out ${title}: ${url}`,
    }),
    isLink: true,
  }),
  sms: (url: string, title: string) => ({
    shareUrl: setSearchParams('sms://', {
      body: `Hey! Check out ${title}: ${url}`,
    }),
    isLink: true,
  }),
}

type ShareType = keyof typeof SHARERS

export function clickHandler(type: ShareType, title: string, url: string): void {
  const { shareUrl, isLink } = SHARERS[type](url, title)

  if (isLink) {
    window.location.href = shareUrl
    return
  }

  window.open(shareUrl, '_blank')
}
