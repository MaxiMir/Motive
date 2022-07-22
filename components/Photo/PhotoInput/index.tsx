import { ChangeEvent, useRef } from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'
import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/ui/AppEmoji'
import i18n from './i18n'

export interface PhotoInputProps {
  multiple?: boolean
  disabled: boolean
  onSelect: (photos: File[]) => void
}

export default function PhotoInput({ multiple, disabled, onSelect }: PhotoInputProps) {
  const { locale } = useLocale()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const { title } = i18n[locale]

  const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && onSelect(Array.from(e.target.files))
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
