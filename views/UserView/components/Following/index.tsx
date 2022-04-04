import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
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
  const classes = useStyles()
  const setFollowing = useSetFollowing(id, following, locale)
  const { getTitle } = i18n[locale]
  const title = getTitle(following)

  return (
    <IconButton title={title} className={classes.button} onClick={setFollowing}>
      <AppEmoji name="following" variant="h5" className={clsx([classes.emoji, !following && classes.emojiNotActive])} />
    </IconButton>
  )
}

const useStyles = makeStyles({
  button: {
    height: 48,
  },
  emoji: {
    lineHeight: '28px',
  },
  emojiNotActive: {
    filter: 'grayscale(1)',
  },
})
