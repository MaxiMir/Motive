import { ChangeEvent, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Modal from '@ui/Modal'
import Icon from '@ui/Icon'
import { useMessages } from './lib/hooks/useMessages'
import { useUpdateAvatar } from './lib/hooks/useUpdateAvatar'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface UpdatingAvatarModalProps {
  userId: number
  onClose: () => void
}

function UpdatingAvatarModal({ userId, onClose }: UpdatingAvatarModalProps) {
  const messages = useMessages()
  const inputRef = useRef<HTMLInputElement>(null)
  const { isLoading, mutateAsync } = useUpdateAvatar(userId)

  const onClick = () => inputRef.current?.click()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const formData = new FormData()
    formData.append('avatar', e.target.files[0])
    mutateAsync(formData).then(onClose)
  }

  return (
    <Modal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Stack alignItems="center" spacing={2}>
        <Stack alignItems="center" spacing={1}>
          <Description>{messages.description}.</Description>
          <Description sx={{ color: 'zen.sand' }}>{messages.typesText}.</Description>
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
          {messages.selectText}
        </Button>
        <Input ref={inputRef} type="file" accept="image/*" onChange={onChange} />
        <Divider sx={{ width: '100%', mt: 2 }} light />
        <Typography variant="caption" textAlign="center" sx={{ color: 'zen.silent' }}>
          {messages.hintText}
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

export default UpdatingAvatarModal
