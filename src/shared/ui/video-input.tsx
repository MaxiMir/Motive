import { Button, Chip, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, useRef } from 'react'
import { useIntl } from 'react-intl'

interface VideoInputProps {
  disabled: boolean
  onSelect: (video: File) => void
}

function VideoInput({ disabled, onSelect }: VideoInputProps) {
  const videoInputRef = useRef<HTMLInputElement>(null)
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'component.video-input.title' })
  const soonText = formatMessage({ id: 'common.soon' })

  const onAddVideo = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && onSelect(e.target.files?.[0])
  }

  const onClick = () => videoInputRef.current?.click()

  return (
    <>
      <StyledButton
        variant="outlined"
        color="warning"
        title={title}
        aria-label={title}
        disabled={disabled}
        onClick={onClick}
      >
        <Typography variant="h1" paragraph m={0}>
          📼
        </Typography>
        <StyledChip size="small" label={soonText} />
      </StyledButton>
      <Input ref={videoInputRef} type="file" accept=".mov,.mp4" onChange={onAddVideo} />
    </>
  )
}

const Input = styled('input')({
  display: 'none',
})

const StyledButton = styled(Button)({
  position: 'relative',
  width: 80,
  height: 80,
})

const StyledChip = styled(Chip)({
  position: 'absolute',
  top: -12,
  left: '50%',
  transform: 'translateX(-50%)',
  borderColor: 'rgba(255, 167, 38, 0.7)',
  color: 'rgb(255, 167, 38)',
})

export default VideoInput
