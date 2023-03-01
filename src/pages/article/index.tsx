import { Button, Stack, Typography } from '@mui/material'
import { compiler } from 'markdown-to-jsx'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { Illustration } from 'pages/article/illustration'
import { tryNativeShare } from 'features/share'
import { Article } from 'entities/article'
import { useFormatDate, useToggle } from 'shared/lib/hooks'
import Container from 'shared/ui/Container'
import Icon from 'shared/ui/Icon'

const Share = dynamic(() => import('features/share'))

export function ArticlePage({ meta, href, content }: Article) {
  const { formatMessage } = useIntl()
  const formatDate = useFormatDate()
  const [sharing, toggleSharing] = useToggle()
  const date = formatDate(meta.date, { day: 'numeric', month: 'long', year: 'numeric' })
  const markdown = compiler(content, { wrapper: null, overrides: { p: Typography } })
  const shareText = formatMessage({ id: 'common.share' })

  const onShare = () => tryNativeShare(href, meta.title, toggleSharing)

  return (
    <>
      <Container>
        <Typography
          variant="caption"
          component="time"
          dateTime={meta.date}
          mb={1}
          sx={{ color: 'zen.silent' }}
        >
          {date}
        </Typography>
        <Typography variant="h4" component="h1" mb={2}>
          {meta.header}
        </Typography>
        <Illustration meta={meta} />
        {markdown}
        <Stack alignItems="center" mt={2}>
          <Button startIcon={<Icon name="share" />} variant="outlined" onClick={onShare}>
            {shareText}
          </Button>
        </Stack>
      </Container>
      {sharing && <Share href={href} title={meta.title} onClose={toggleSharing} />}
    </>
  )
}
