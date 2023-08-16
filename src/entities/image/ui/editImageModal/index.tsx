import { Button, Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, useRef } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/Icon'
import Modal from 'shared/ui/Modal'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface EditImageModalProps {
  description?: string
  isLoading: boolean
  onSubmit: (formData: FormData) => void
  onClose: () => void
}

export function EditImageModal({ description, isLoading, onSubmit, onClose }: EditImageModalProps) {
  const { formatMessage } = useIntl()
  const inputRef = useRef<HTMLInputElement>(null)
  const title = formatMessage({ id: 'common.upload-image' })
  const typesText = formatMessage({ id: 'common.image-types' })
  const selectText = formatMessage({ id: 'common.select-file' })
  const hintText = formatMessage({ id: 'common.photo-hint' })

  const onClick = () => inputRef.current?.click()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const formData = new FormData()
    formData.append('image', e.target.files[0])
    onSubmit(formData)
  }

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack alignItems="center" gap={2}>
        <Stack alignItems="center" gap={1}>
          <Description>{description}</Description>
          <Description color="zen.sand">{typesText}</Description>
        </Stack>
        <Button
          size="small"
          variant="outlined"
          disabled={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={14.5} color="inherit" />
            ) : (
              <Icon name="attach_file" />
            )
          }
          onClick={onClick}
        >
          {selectText}
        </Button>
        <Input ref={inputRef} type="file" accept="image/*" onChange={onChange} />
        <Divider sx={{ width: '100%', mt: 2 }} light />
        <Typography variant="caption" textAlign="center" color="zen.silent">
          {hintText}
        </Typography>
      </Stack>
    </Modal>
  )
}

const Description = styled(Typography)({
  fontSize: 14,
  textAlign: 'center',
})

const Input = styled('input')({
  display: 'none',
})
