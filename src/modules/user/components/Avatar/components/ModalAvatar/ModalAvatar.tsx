import { ChangeEvent, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useUserContext, useUserPage } from '@modules/user/hooks'
import { useUpdatePhoto } from '@features/user'
import AppModal from '@ui/AppModal'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface ModalAvatarProps {
  onClose: () => void
}

function ModalAvatar({ onClose }: ModalAvatarProps) {
  const messages = useMessages()
  const user = useUserContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const { isLoading, mutateAsync } = useUpdatePhoto(user.id)
  const { refetch } = useUserPage()

  const onClick = () => inputRef.current?.click()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    mutateAsync(e.target.files[0])
      .then(() => refetch())
      .then(onClose)
  }

  return (
    <AppModal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Description>{messages.description}.</Description>
          <Description sx={{ color: 'zen.sand' }}>{messages.typesText}.</Description>
        </Box>
        <Button
          variant="outlined"
          size="small"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size="14.5px" color="inherit" /> : <AppIcon name="attach_file" />}
          onClick={onClick}
        >
          {messages.selectText}
        </Button>
        <Input ref={inputRef} type="file" accept="image/*" onChange={onChange} />
        <Divider sx={{ width: '100%', mt: 2 }} light />
        <Typography variant="caption" sx={{ color: 'zen.silent' }}>
          {messages.hintText}
        </Typography>
      </Box>
    </AppModal>
  )
}

const Description = styled(Typography)({
  fontSize: 14,
  textAlign: 'center',
})

const Input = styled('input')({
  display: 'none',
})

export default ModalAvatar
