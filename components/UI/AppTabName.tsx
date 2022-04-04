import i18n from 'constants/i18n'
import { Locale } from 'hooks/useLocale'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { MainCharacteristicName } from 'dto'
import { createStyles, makeStyles } from '@material-ui/core'

export interface AppTabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
  locale: Locale
}

export default function AppTabName({ name, emoji, locale }: AppTabNameProps): JSX.Element {
  const classes = useStyles({ locale })
  const text = i18n[locale][name]

  return (
    <AppBox alignItems="center" spacing={1}>
      <AppEmoji name={emoji} variant="h6" />
      <AppTypography className={classes.title}>{text}</AppTypography>
    </AppBox>
  )
}

type UseStylesProps = Pick<AppTabNameProps, 'locale'>

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      textTransform: 'none',
      [theme.breakpoints.down('xs')]: {
        fontSize: (props: UseStylesProps) => (props.locale === 'ru' ? '0.75rem' : '0.875rem'),
      },
    },
  }),
)
