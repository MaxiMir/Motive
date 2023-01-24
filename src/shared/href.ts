export const enum Route {
  Feed = '/feed',
  Search = '/search',
  Rating = '/rating',
  Following = '/following',
  Contact = '/contact',
  Articles = '',
}

export const getImageSrc = (src: string): string => {
  return src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src
}
