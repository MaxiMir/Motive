import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { getHashtagHref } from 'entities/page'
import { useFormatNumber } from 'shared/lib/hooks'

interface HashtagProps {
  name: string
  gradient?: string
  views: number
}

function Hashtag({ name, gradient, views }: HashtagProps) {
  const { push } = useRouter()
  const formatNumber = useFormatNumber()
  const formattedViews = formatNumber(views)

  const onClick = () => {
    const href = getHashtagHref(name)
    push(href)
  }

  return (
    <Button
      color="inherit"
      sx={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '12px',
        backgroundImage: gradient,
      }}
      onClick={onClick}
    >
      <Stack
        alignItems="flex-start"
        justifyContent="space-between"
        p={1}
        width="100%"
        height="100%"
        overflow="hidden"
      >
        <Typography variant="subtitle1" component="p" fontWeight="bold">
          #{name}
        </Typography>
        <Typography
          variant="h4"
          component="p"
          fontWeight="bold"
          sx={{
            background:
              'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          {name}
        </Typography>
        <Typography sx={{ opacity: 0.5 }}>{formattedViews}</Typography>
      </Stack>
    </Button>
  )
}

export default Hashtag
