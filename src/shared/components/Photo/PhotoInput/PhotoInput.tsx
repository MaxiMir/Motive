import { ChangeEvent, useRef } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

interface PhotoInputProps {
  multiple?: boolean
  disabled: boolean
  onSelect: (photos: File[]) => void
}

function PhotoInput({ multiple, disabled, onSelect }: PhotoInputProps) {
  const messages = useMessages()
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    onSelect(Array.from(e.target.files))
  }

  const onClick = () => inputRef.current?.click()

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
        <AppEmoji name="tape" variant="h1" />
      </Button>
      <Input ref={inputRef} type="file" accept="image/*" multiple={multiple} onChange={onChange} />
    </>
  )
}

const Input = styled('input')({
  display: 'none',
})

export default PhotoInput