import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  CardActionArea,
  Button,
} from '@mui/material'
import matter from 'gray-matter'
import Link from 'next/link'
import { ArticleDto } from 'shared/api'
import { Route } from 'shared/config'
import { getStaticSrc } from 'shared/lib/helpers'
import Icon from 'shared/ui/Icon'
import { generateColorByName } from 'shared/ui/palette'

interface ArticlePreviewProps {
  article: ArticleDto
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const { pathname, image, views, sharesCount, bookmarkedCount, likeCount, content } = article
  const { data } = matter(content)
  const href = `${Route.Blog}/${pathname}`
  const backgroundColor = generateColorByName(data.tag, {
    saturation: 50,
    lightness: 20,
    range: 10,
  })
  const staticSrc = getStaticSrc(image)

  return (
    <Card href={href} component={Link}>
      <CardActionArea sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box
          sx={{
            width: {
              md: 300,
            },
          }}
        >
          <CardMedia component="img" image={staticSrc} alt="" />
        </Box>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
          <Chip label={data.tag} size="small" sx={{ alignSelf: 'flex-start', backgroundColor }} />
          <Typography gutterBottom variant="h5" component="p">
            {data.header}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
          <Box display="flex" gap={1}>
            <Button startIcon={<Icon name="ios_share" />} size="small" disabled component="span">
              {sharesCount}
            </Button>
            <Button startIcon={<Icon name="favorite" />} size="small" disabled component="span">
              {likeCount}
            </Button>
            <Button startIcon={<Icon name="bookmark" />} size="small" disabled component="span">
              {bookmarkedCount}
            </Button>
            <Button startIcon={<Icon name="visibility" />} size="small" disabled component="span">
              {views}
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
