import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, useRef } from 'react'
import { useIntl } from 'react-intl'

interface PhotoInputProps {
  multiple?: boolean
  disabled: boolean
  onSelect: (photos: File[]) => void
}

function PhotoInput({ multiple, disabled, onSelect }: PhotoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.load-photo' })

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
          🎞
        </Typography>
      </Button>
      <Input ref={inputRef} type="file" accept="image/*" multiple={multiple} onChange={onChange} />
    </>
  )
}

const Input = styled('input')({
  display: 'none',
})

export default PhotoInput
