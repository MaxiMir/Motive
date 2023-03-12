import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { ArticleBase } from 'entities/article/types'

interface ArticlePreviewProps {
  article: ArticleBase
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const { data, href } = article

  return (
    <Card href={href} component={Link}>
      <CardActionArea>
        <CardMedia component="img" height="250" image={data.image} alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
