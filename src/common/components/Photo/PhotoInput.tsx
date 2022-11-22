import { ChangeEvent, useRef } from 'react'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import AppEmoji from '@ui/AppEmoji'

interface PhotoInputProps {
  multiple?: boolean
  disabled: boolean
  onSelect: (photos: File[]) => void
}

export default function PhotoInput({ multiple, disabled, onSelect }: PhotoInputProps) {
  const { formatMessage } = useIntl()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const title = formatMessage({ id: 'common.load-photo' })

  const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    onSelect(Array.from(e.target.files))
  }

  const onClick = () => photoInputRef.current?.click()

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
        <AppEmoji name="tape" variant="h1" />
      </Button>
      <Input ref={photoInputRef} type="file" accept="image/*" multiple={multiple} onChange={onAddPhoto} />
    </>
  )
}

const Input = styled('input')({
  display: 'none',
})
