import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { ArticleBase } from 'entities/article/types'
import { useFormatDate } from 'shared/lib/hooks'

interface ArticlePreviewProps {
  article: ArticleBase
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const { data, href } = article
  const formatDate = useFormatDate()
  const date = formatDate(data.date, { day: '2-digit', month: '2-digit' })

  return (
    <Card href={href} component={Link}>
      <CardActionArea sx={{ display: 'flex' }}>
        <Box width={300}>
          <CardMedia component="img" image={data.image} alt="" />
        </Box>
        <Stack justifyContent="space-between" flex={1}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.header}
            </Typography>
            <Chip size="small" component="time" dateTime={data.date} label={date} />
            <Typography variant="body2" color="text.secondary" mt={1}>
              {data.description}
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
