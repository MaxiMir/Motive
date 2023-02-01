import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'

interface ShowMoreProps {
  open: boolean
  onClick: () => void
}

export function ShowMore({ open, onClick }: ShowMoreProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: open ? 'common.show-less' : 'common.show-more' })

  return (
    <TextButton size="small" color="inherit" onClick={onClick}>
      {buttonText}
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
