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
      <Button
        variant="outlined"
        color="warning"
        title={title}
        aria-label={title}
        disabled={disabled}
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
        }}
        onClick={onClick}
      >
        <Typography variant="h1" paragraph m={0}>
          📼
        </Typography>
        <Chip
          size="small"
          label={soonText}
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            borderColor: 'rgba(255, 167, 38, 0.7)',
            color: 'rgb(255, 167, 38)',
          }}
        />
      </Button>
      <Input ref={videoInputRef} type="file" accept=".mov,.mp4" onChange={onAddVideo} />
    </>
  )
}

const Input = styled('input')({
  display: 'none',
})

export default VideoInput
