import { IconButton } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import useSetFollowing from './hook'
import i18n from './i18n'

interface FollowingProps {
  id: number
  following: boolean
  locale: Locale
}

export default function Following({ id, following, locale }: FollowingProps): JSX.Element {
  const setFollowing = useSetFollowing(id, following, locale)
  const { getTitle } = i18n[locale]
  const title = getTitle(following)

  return (
    <IconButton title={title} sx={{ width: 48, height: 48 }} onClick={setFollowing}>
      <AppEmoji name="following" variant="h5" sx={{ filter: !following ? 'grayscale(1)' : undefined }} />
    </IconButton>
  )
}
