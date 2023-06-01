import { Button, Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, useRef } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/Icon'
import Modal from 'shared/ui/Modal'
import { useUpdateAvatar } from './model'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface UpdateAvatarModalProps {
  userId: number
  onClose: () => void
}

function UpdateAvatarModal({ userId, onClose }: UpdateAvatarModalProps) {
  const { formatMessage } = useIntl()
  const inputRef = useRef<HTMLInputElement>(null)
  const { isLoading, mutateAsync } = useUpdateAvatar(userId)
  const title = formatMessage({ id: 'common.upload-photo' })
  const description = formatMessage({ id: 'common.photo-description' })
  const typesText = formatMessage({ id: 'common.photo-types' })
  const selectText = formatMessage({ id: 'common.select-file' })
  const hintText = formatMessage({ id: 'common.photo-hint' })

  const onClick = () => inputRef.current?.click()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const formData = new FormData()
    formData.append('avatar', e.target.files[0])
    mutateAsync(formData).then(onClose)
  }

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack alignItems="center" gap={2}>
        <Stack alignItems="center" gap={1}>
          <Description>{description}.</Description>
          <Description sx={{ color: 'zen.sand' }}>{typesText}.</Description>
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
        <Typography variant="caption" textAlign="center" sx={{ color: 'zen.silent' }}>
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

export default UpdateAvatarModal
