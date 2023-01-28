import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useMessages } from './lib'

interface ShowMoreProps {
  open: boolean
  onClick: () => void
}

function ShowMore({ open, onClick }: ShowMoreProps) {
  const messages = useMessages(open)

  return (
    <TextButton size="small" color="inherit" onClick={onClick}>
      {messages.buttonText}
    </TextButton>
  )
}

const TextButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: theme.palette.grey[600],
  ':hover': {
    backgroundColor: 'initial',
    textDecoration: 'underline',
  },
}))

export default ShowMore
