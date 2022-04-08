import { ChangeEvent, useRef } from 'react'
import { Button, Chip } from '@mui/material'
import AppEmoji from 'components/UI/AppEmoji'
import { styled } from '@mui/system'

export interface VideoInputProps {
  tmpl: 'input'
  disabled: boolean
  onSelect: (video: File) => void
}

export default function VideoInput({ disabled, onSelect }: VideoInputProps): JSX.Element {
  const videoInputRef = useRef<HTMLInputElement>(null)

  const onAddVideo = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && onSelect(e.target.files?.[0])
  }

  const onClick = () => videoInputRef.current?.click()

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        title="Load video"
        aria-label="Load video"
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
          label="Soon"
          size="small"
          sx={{
            position: 'absolute',
            top: -12,
            right: 12,
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
