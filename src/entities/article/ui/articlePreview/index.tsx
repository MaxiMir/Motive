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
import { generateColorByName } from 'shared/ui/palette'

interface ArticlePreviewProps {
  article: ArticleBase
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const { data, href } = article
  const formatDate = useFormatDate()
  const date = formatDate(data.date, { day: '2-digit', month: '2-digit' })
  const backgroundColor = generateColorByName(data.tag, {
    saturation: 60,
    lightness: 10,
    range: 30,
  })

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
          <CardMedia component="img" image={data.image} alt="" />
        </Box>
        <Stack justifyContent="space-between" flex={1}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="p">
              {data.header}
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              component="time"
              dateTime={data.date}
              label={date}
            />
            <Typography variant="body2" color="text.secondary" my={1}>
              {data.description}
            </Typography>
            <Chip label={data.tag} size="small" sx={{ backgroundColor }} />
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
