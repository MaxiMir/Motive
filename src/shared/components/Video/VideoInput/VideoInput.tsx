import { ChangeEvent, useRef } from 'react'
import { Button, Chip } from '@mui/material'
import { styled } from '@mui/system'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

interface VideoInputProps {
  disabled: boolean
  onSelect: (video: File) => void
}

function VideoInput({ disabled, onSelect }: VideoInputProps) {
  const messages = useMessages()
  const videoInputRef = useRef<HTMLInputElement>(null)

  const onAddVideo = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && onSelect(e.target.files?.[0])
  }

  const onClick = () => videoInputRef.current?.click()

  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        title={messages.title}
        aria-label={messages.title}
        disabled={disabled}
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
        }}
        onClick={onClick}
      >
        <AppEmoji name="cassette" variant="h1" />
        <Chip
          label={messages.soonText}
          size="small"
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