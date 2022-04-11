import { ChangeEvent, useRef } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import AppEmoji from 'components/UI/AppEmoji'

export interface PhotoInputProps {
  tmpl: 'input'
  multiple?: boolean
  disabled: boolean
  onSelect: (photos: File[]) => void
}

export default function PhotoInput({ multiple, disabled, onSelect }: PhotoInputProps): JSX.Element {
  const photoInputRef = useRef<HTMLInputElement>(null)

  const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && onSelect(Array.from(e.target.files))
  }

  const onClick = () => photoInputRef.current?.click()

  return (
    <>
      <Button
        color="warning"
        variant="outlined"
        title="Load photo"
        aria-label="Load photo"
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
      <Input ref={photoInputRef} type="file" accept="image/*" multiple={multiple} onChange={onAddPhoto} />
    </>
  )
}

const Input = styled('input')({
  display: 'none',
})
