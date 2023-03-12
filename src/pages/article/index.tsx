import { Breadcrumbs, Button, Grid, Link as MuiLink, Stack, Typography } from '@mui/material'
import { compiler } from 'markdown-to-jsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Illustration } from 'pages/article/illustration'
import { tryNativeShare } from 'features/share'
import { Article, ArticlePreview } from 'entities/article'
import { Route } from 'shared/config'
import { useFormatDate, useToggle } from 'shared/lib/hooks'
import Container from 'shared/ui/Container'
import Icon from 'shared/ui/Icon'
import { useMessages } from './lib'

const Share = dynamic(() => import('features/share'))

export function ArticlePage({ data, href, content, more }: Article) {
  const messages = useMessages()
  const formatDate = useFormatDate()
  const [sharing, toggleSharing] = useToggle()
  const date = formatDate(data.date, { day: 'numeric', month: 'long', year: 'numeric' })
  const markdown = compiler(content, { wrapper: null, overrides: { p: Typography } })

  const onShare = () => tryNativeShare(href, data.title, toggleSharing)

  return (
    <Container>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <MuiLink underline="hover" color="inherit" href={Route.Articles} component={Link}>
          {messages.articlesText}
        </MuiLink>
      </Breadcrumbs>
      <Typography variant="h4" component="h1" my={1}>
        {data.header}
      </Typography>
      <Typography
        variant="caption"
        component="time"
        dateTime={data.date}
        mb={2}
        sx={{ color: 'zen.silent' }}
      >
        {date}
      </Typography>
      <Illustration motto={data.motto} image={data.image} />
      {markdown}
      <Stack alignItems="center" mt={2}>
        <Button startIcon={<Icon name="share" />} variant="outlined" onClick={onShare}>
          {messages.shareText}
        </Button>
      </Stack>
      {sharing && <Share href={href} title={data.title} onClose={toggleSharing} />}
      <Grid container spacing={2} mt={4}>
        {more.map((article) => (
          <Grid item xs={12} md={4} key={article.href}>
            <ArticlePreview article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
