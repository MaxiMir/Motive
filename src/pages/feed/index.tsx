import { Grid, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { ArticlePreview } from 'entities/article'
import { ArticleDto } from 'shared/api'
import Container from 'shared/ui/Container'

interface FeedPageProps {
  articles: ArticleDto[]
}

export function FeedPage({ articles }: FeedPageProps) {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.feed.header' })

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {header}
      </Typography>
      <Grid container spacing={2} mb={4}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <ArticlePreview article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
