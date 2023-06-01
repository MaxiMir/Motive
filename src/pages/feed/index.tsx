import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Container from 'shared/ui/Container'
import FadeTypography from 'shared/ui/FadeTypography'

export function FeedPage() {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.feed.header' })
  const text = formatMessage({ id: 'common.dev' })

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {header}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex={1}
        gap={1}
        height="80dvh"
      >
        <Typography variant="h5" component="p" color="primary">
          {text}
        </Typography>
        <FadeTypography>⌨️</FadeTypography>
      </Box>
    </Container>
  )
}
