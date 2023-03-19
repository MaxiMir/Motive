import {
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material'
import { compiler } from 'markdown-to-jsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Illustration } from 'pages/article/illustration'
import { tryNativeShare } from 'features/share'
import { Article, ArticlePreview, getReadTime } from 'entities/article'
import { Route } from 'shared/config'
import { useFormatDate, useToggle } from 'shared/lib/hooks'
import Container from 'shared/ui/Container'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

const Share = dynamic(() => import('features/share'))

export function ArticlePage({ data, href, content, more }: Article) {
  const messages = useMessages()
  const formatDate = useFormatDate()
  const [sharing, toggleSharing] = useToggle()
  const date = formatDate(data.date, { day: 'numeric', month: 'long', year: 'numeric' })
  const markdown = compiler(content, { wrapper: null, overrides: { p: Typography } })
  const readTime = getReadTime(content)

  const onShare = () => tryNativeShare(href, data.title, toggleSharing)

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <Breadcrumbs separator="•" aria-label="breadcrumb">
          <MuiLink underline="hover" color="inherit" href={Route.Articles} component={Link}>
            {messages.articlesText}
          </MuiLink>
          <Typography component="time" dateTime={data.date} sx={{ color: 'zen.silent' }}>
            {date}
          </Typography>
        </Breadcrumbs>
        <TooltipArrow title={messages.shareText}>
          <IconButton
            size="small"
            sx={(theme) => ({ color: theme.palette.grey[600] })}
            onClick={onShare}
          >
            <Icon name="ios_share" />
          </IconButton>
        </TooltipArrow>
      </Box>
      <article>
        <Stack gap={1} component="header" mb={2}>
          <Typography variant="h4" component="h1">
            {data.header}
          </Typography>
          <Typography variant="caption" sx={{ color: 'zen.silent' }}>
            {readTime} {messages.readTimeText}
          </Typography>
        </Stack>
        <Illustration motto={data.motto} image={data.image} />
        {markdown}
      </article>
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
