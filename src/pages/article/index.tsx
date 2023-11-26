import { Box, Breadcrumbs, Button, Chip, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { compiler } from 'markdown-to-jsx'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { Illustration } from 'pages/article/illustration'
import { tryNativeShare } from 'features/share'
import { ArticlePreview, getReadTime } from 'entities/article'
import { ArticlePageDto } from 'shared/api'
import { Route } from 'shared/config'
import { setSearchParams } from 'shared/lib/helpers'
import { useFormatDate, useFormatNumber, useToggle } from 'shared/lib/hooks'
import Container from 'shared/ui/container'
import Icon from 'shared/ui/icon'
import { generateColorByName } from 'shared/ui/palette'

const Share = dynamic(() => import('features/share'))

interface ArticlePageProps {
  article: ArticlePageDto
}

export function ArticlePage({ article }: ArticlePageProps) {
  const { title, header, date, tag, pathname, motto, content, image, more, sharesCount, views } =
    article
  const { formatMessage } = useIntl()
  const formatDate = useFormatDate()
  const [sharing, toggleSharing] = useToggle()
  const formattedDate = formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })
  const markdown = compiler(content, { wrapper: null, overrides: { p: Typography } })
  const readTime = getReadTime(content)
  const backgroundColor = generateColorByName(tag, {
    saturation: 50,
    lightness: 20,
    range: 10,
  })
  const formatNumber = useFormatNumber()
  const href = setSearchParams([Route.Blog, pathname].join('/'), { share: 'web' })
  const shareText = formatMessage({ id: 'common.share' })
  const readTimeText = formatMessage({ id: 'common.read-time' })
  const sharesCountFormatted = formatNumber(sharesCount)
  const viewsFormatted = formatNumber(views)

  const onShare = () => tryNativeShare(href, title, toggleSharing)

  return (
    <>
      <Container
        sx={{
          paddingTop: 3,
          '& img': {
            maxWidth: '100%',
            marginBottom: 2,
            borderRadius: 2,
          },
        }}
      >
        <Progress className="sdadsda" />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Breadcrumbs separator="•" aria-label="breadcrumb">
            <Chip size="small" label={tag} sx={{ backgroundColor }} />
            <Typography component="time" dateTime={date} color="zen.silent">
              {formattedDate}
            </Typography>
          </Breadcrumbs>
          <Box display="flex" gap={1}>
            {/*
          <Button
            size="small"
            color="inherit"
            aria-label=""
            disabled
            startIcon={<Icon name="bookmark" />}
            sx={(theme) => ({ color: theme.palette.grey[600] })}
          >
            {bookmarkedCount}
          </Button>
          */}
            <Button
              size="small"
              color="inherit"
              aria-label={shareText}
              startIcon={<Icon name="ios_share" />}
              sx={(theme) => ({ color: theme.palette.grey[600] })}
              onClick={onShare}
            >
              {sharesCountFormatted}
            </Button>
          </Box>
        </Box>
        <article>
          <Stack gap={1} component="header" mb={2}>
            <Typography variant="h4" component="h1">
              {header}
            </Typography>
            <Typography variant="caption" color="zen.silent">
              {readTime} {readTimeText}
            </Typography>
          </Stack>
          <Illustration motto={motto} image={image} />
          {markdown}
        </article>
        <Box mt={3}>
          {/*
        <Button color="inherit" aria-label="" disabled startIcon={<Icon name="favorite" />}>
          {likeCount}
        </Button>
        */}
          <Button startIcon={<Icon name="visibility" />} size="small" disabled component="span">
            {viewsFormatted}
          </Button>
        </Box>
        <Grid container spacing={2} mt={4}>
          {more.map((preview) => (
            <Grid item xs={12} key={preview.id}>
              <ArticlePreview article={preview} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {sharing && <Share href={href} title={title} onClose={toggleSharing} />}
    </>
  )
}

const Progress = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  height: 4,
  background: 'linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)',
  animation: 'grow-progress auto linear',
  animationTimeline: 'scroll()',
  '@keyframes grow-progress': {
    from: {
      width: 0,
    },
    to: {
      width: '100dvw',
    },
  },
})
