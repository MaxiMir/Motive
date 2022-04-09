import dynamic from 'next/dynamic'
import { Box, Button, IconButton } from '@mui/material'
import AppIcon from 'components/UI/AppIcon'

const AppImage = dynamic(() => import('components/UI/AppImage'))
const LocalImage = dynamic(() => import('./components/LocalImage'))

export interface PhotoButtonProps {
  tmpl: 'button'
  image: File | string
  disabled: boolean
  onClick: () => void
}

export default function PhotoButton({ image, disabled, onClick }: PhotoButtonProps): JSX.Element {
  return (
    <Button
      color="secondary"
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
          <AppImage src={image} layout="fill" objectFit="contain" />
        )}
        <IconButton
          aria-label="Remove photo"
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
      </Box>
    </Button>
  )
}
