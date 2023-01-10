import dynamic from 'next/dynamic'
import { Box, Button, IconButton } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const LocalImage = dynamic(() => import('./components/LocalImage'))
const AppImage = dynamic(() => import('@ui/AppImage'))

interface PhotoButtonProps {
  image: File | string
  disabled: boolean
  onClick: () => void
}

function PhotoButton({ image, disabled, onClick }: PhotoButtonProps) {
  const messages = useMessages()

  return (
    <Button
      color="warning"
      variant="outlined"
      component="div"
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        overflow: 'hidden',
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        {image instanceof File ? (
          <LocalImage file={image} />
        ) : (
          <AppImage src={image} alt="" layout="fill" objectFit="contain" />
        )}
        <TooltipArrow title={messages.title}>
          <IconButton
            disabled={disabled}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
            }}
            onClick={onClick}
          >
            <AppIcon name="cancel" />
          </IconButton>
        </TooltipArrow>
      </Box>
    </Button>
  )
}

export default PhotoButton
