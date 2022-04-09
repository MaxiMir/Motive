import { Box, Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

interface NoResultProps {
  phrase: string
}

export default function NoResult({ phrase }: NoResultProps): JSX.Element {
  const { locale } = useLocale()
  const { title, description } = i18n[locale]

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5" component="p">
        {title} &#171;
        <Box component="span" sx={{ color: 'zen.sand' }}>
          {phrase}
        </Box>
        &#187;.
      </Typography>
      <Typography sx={{ color: 'zen.silent' }}>{description}</Typography>
    </Box>
  )
}
