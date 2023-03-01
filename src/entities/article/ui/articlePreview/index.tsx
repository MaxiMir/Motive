import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { Article } from 'entities/article/types'

type ArticlePreviewProps = Omit<Article, 'content'>

export function ArticlePreview({ meta, href }: ArticlePreviewProps) {
  return (
    <Card href={href} component={Link}>
      <CardActionArea>
        <CardMedia component="img" height="250" image={meta.image} alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {meta.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {meta.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
