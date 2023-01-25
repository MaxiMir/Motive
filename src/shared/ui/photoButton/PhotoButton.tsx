import { Button, IconButton, Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import Icon from '@shared/ui/Icon'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './lib/hooks/useMessages'

const LocalImage = dynamic(() => import('./ui/localImage/LocalImage'))
const Image = dynamic(() => import('@shared/ui/Image'))

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
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
      >
        {image instanceof File ? (
          <LocalImage file={image} />
        ) : (
          <Image src={image} alt="" layout="fill" objectFit="contain" />
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
            <Icon name="cancel" />
          </IconButton>
        </TooltipArrow>
      </Stack>
    </Button>
  )
}

export default PhotoButton
