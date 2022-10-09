import { Button } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppEmoji from 'components/ui/AppEmoji'
import useSetFollowing from './hook'
import i18n from './i18n'

interface FollowingProps {
  id: number
  following: boolean
  locale: Locale
}

export default function Following({ id, following, locale }: FollowingProps) {
  const setFollowing = useSetFollowing(id, following, locale)
  const { getName } = i18n[locale]
  const name = getName(following)

  return (
    <Button
      variant="outlined"
      color="warning"
      startIcon={<AppEmoji name="following" onlyEmoji />}
      className="apple-hide"
      sx={{ alignSelf: 'center', filter: following ? 'grayscale(0.6)' : undefined }}
      onClick={setFollowing}
    >
      {name}
    </Button>
  )
}
