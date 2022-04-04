import { makeStyles } from '@material-ui/core/styles'
import { MainCharacteristicName } from 'dto'
import { CharacteristicColor } from 'hooks/useCharacteristicColors'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'
import i18n from './i18n'

export interface AdvantageProps {
  id: MainCharacteristicName | 'completed'
  href: string
  color: CharacteristicColor
  locale: Locale
}

export default function Advantage({ id, href, color, locale }: AdvantageProps): JSX.Element {
  const classes = useStyles({ color })
  const { title, subtitle } = i18n[locale][id]

  return (
    <AppBox justifyContent="center" alignItems="center" className={classes.root} flex={1}>
      <AppBox alignItems="center" spacing={3}>
        <AppLink href={href} className={classes.imageLink}>
          <AppEmoji name={id} variant="h2" />
        </AppLink>
        <AppBox flexDirection="column" alignItems="space-between">
          <AppLink href={href}>
            <AppTypography variant="h5" className={classes.title}>
              {title}
            </AppTypography>
          </AppLink>
          <AppTypography className={classes.subtitle}>{subtitle}</AppTypography>
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

type UseStylesProps = Pick<AdvantageProps, 'color'>

const useStyles = makeStyles({
  root: {
    height: '100%',
    background: (props: UseStylesProps) => `linear-gradient(90deg, ${props.color.start} 0%, ${props.color.end} 100%)`,
  },
  imageLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  title: {
    color: '#F5F5F7',
    width: 245,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  subtitle: {
    color: '#f5f5f799',
  },
})
