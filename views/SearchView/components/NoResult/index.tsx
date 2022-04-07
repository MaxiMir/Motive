import { Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface NoResultProps {
  phrase: string
}

export default function NoResult({ phrase }: NoResultProps): JSX.Element {
  const { locale } = useLocale()
  const { title, description } = i18n[locale]

  return (
    <AppBox flexDirection="column" gap={1}>
      <Typography variant="h5" component="p">
        {title} &#171;
        <AppBox component="span" display={undefined} sx={{ color: 'zen.sand' }}>
          {phrase}
        </AppBox>
        &#187;.
      </Typography>
      <Typography sx={{ color: 'zen.silent' }}>{description}</Typography>
    </AppBox>
  )
}
