import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'

interface NoResultProps {
  phrase: string
}

export default function NoResult({ phrase }: NoResultProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.no-results' })
  const description = formatMessage({ id: 'common.no-results-description' })

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
