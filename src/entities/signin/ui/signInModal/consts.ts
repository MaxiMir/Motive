/* eslint-disable import/no-internal-modules */
import appleSrc from 'public/images/svg/apple.svg'
import githubSrc from 'public/images/svg/github.svg'
import googleSrc from 'public/images/svg/google.svg'
import metaSrc from 'public/images/svg/meta.svg'
/* eslint-disable import/no-internal-modules */

export const SOURCE = {
  Apple: appleSrc,
  Meta: metaSrc,
  GitHub: githubSrc,
  Google: googleSrc,
} as const

export type SourceKey = keyof typeof SOURCE
