import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@mui/material'
import { formatNumber } from '@helpers/intl'
import { getHashtagHref } from './helper'

interface HashtagSearchProps {
  name: string
  gradient?: string
  views: number
}

export default function HashtagSearch({ name, gradient, views }: HashtagSearchProps) {
  const { push } = useRouter()
  const formattedViews = formatNumber(views)

  const onClick = () => {
    const href = getHashtagHref(name)

    push(href)
  }

  return (
    <Button
      sx={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: '12px',
        backgroundImage: gradient,
      }}
      onClick={onClick}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="space-between"
        p={1}
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography variant="subtitle1" component="p" sx={{ color: 'common.white', textTransform: 'none' }}>
          <b>#{name}</b>
        </Typography>
        <Typography
          variant="h4"
          component="p"
          sx={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <b>{name}</b>
        </Typography>
        <Typography sx={{ opacity: 0.5 }}>{formattedViews}</Typography>
      </Box>
    </Button>
  )
}
