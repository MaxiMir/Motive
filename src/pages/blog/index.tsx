import { Grid, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { ArticlePreview } from 'entities/article'
import { ArticleDto } from 'shared/api'
import Container from 'shared/ui/container'

interface BlogPageProps {
  articles: ArticleDto[]
}

export function BlogPage({ articles }: BlogPageProps) {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.blog.header' })

  return (
    <Container>
      <Typography variant="h1" mb={3}>
        {header}
      </Typography>
      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <ArticlePreview article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
