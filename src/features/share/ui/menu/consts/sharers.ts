import { setSearchParams } from '@shared/lib/helpers/url'

const HASHTAG = process.env.NEXT_PUBLIC_APP_NAME as string

export const SHARERS = {
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
