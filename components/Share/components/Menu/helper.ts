const HASHTAG = process.env.NEXT_PUBLIC_APP_NAME as string

type ShareType = keyof typeof SHARERS

/**
 * Social Network element click handler
 */
export const clickHandler = (type: ShareType, title: string, url: string): void => {
  const [shareUrl, isLink] = SHARERS[type](url, title)

  if (isLink) {
    window.location.href = shareUrl
    return
  }

  window.open(shareUrl, '_blank')
}

/**
 * Social Networks
 */
const SHARERS: { [k: string]: (u: string, quote: string) => [string, boolean] } = {
  facebook(u: string, quote: string) {
    return getShareParams({
      shareUrl: 'https://www.facebook.com/sharer/sharer.php',
      params: {
        u,
        quote,
        hashtag: HASHTAG,
      },
    })
  },
  twitter(url: string, text: string) {
    return getShareParams({
      shareUrl: 'https://twitter.com/intent/tweet/',
      params: {
        url,
        text,
        hashtags: HASHTAG,
      },
    })
  },
  telegram(url: string, text: string) {
    return getShareParams({
      shareUrl: 'tg://msg_url',
      params: {
        url,
        text,
      },
      isLink: true,
    })
  },
  vk(url: string, title: string) {
    return getShareParams({
      shareUrl: 'https://vk.com/share.php',
      params: {
        url,
        title,
      },
    })
  },
  email(url: string, title: string) {
    return getShareParams({
      shareUrl: 'mailto:',
      params: {
        subject: HASHTAG,
        body: `Hey! Check out ${title}: ${url}`,
      },
      isLink: true,
    })
  },
  sms(url: string, title: string) {
    return getShareParams({
      shareUrl: 'sms://',
      params: {
        body: `Hey! Check out ${title}: ${url}`,
      },
      isLink: true,
    })
  },
}

interface ShareParams {
  shareUrl: string
  params: { [k: string]: string }
  isLink?: boolean
}

const getShareParams = ({ shareUrl, params, isLink = false }: ShareParams): [string, boolean] => {
  const urlSearchParams = new URLSearchParams('')

  Object.entries(params).forEach(([name, value]) => {
    urlSearchParams.append(name, value)
  })

  return [`${shareUrl}?${urlSearchParams}`, isLink]
}
