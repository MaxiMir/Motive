import { Button, IconButton, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const Image = dynamic(() => import('shared/ui/image'))
const LocalImage = dynamic(() => import('./local-image'))

interface PhotoButtonProps {
  image: File | string
  disabled: boolean
  onClick: () => void
}

function PhotoButton({ image, disabled, onClick }: PhotoButtonProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'component.photo-button.aria' })

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
        <TooltipArrow title={title}>
          <StyledIconButton disabled={disabled} onClick={onClick}>
            <Icon name="cancel" />
          </StyledIconButton>
        </TooltipArrow>
      </Stack>
    </Button>
  )
}

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -8,
  right: -8,
})

export default PhotoButton
