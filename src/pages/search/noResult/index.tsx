import { Box, Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

interface NoResultProps {
  phrase: string
}

function NoResult({ phrase }: NoResultProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.no-results' })
  const description = formatMessage({ id: 'common.no-results-description' })

  return (
    <Stack gap={1}>
      <Typography variant="h5" component="p">
        {title} &#171;
        <Box component="span" color="zen.sand">
          {phrase}
        </Box>
        &#187;.
      </Typography>
      <Typography sx={{ color: 'zen.silent' }}>{description}</Typography>
    </Stack>
  )
}

export default NoResult
