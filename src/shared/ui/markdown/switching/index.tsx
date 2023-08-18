import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'

interface SwitchingProps {
  open: boolean
  onClick: () => void
}

export function Switching({ open, onClick }: SwitchingProps) {
  const { formatMessage } = useIntl()
  const buttonText = formatMessage({ id: open ? 'common.show-less' : 'common.read-more' })

  return (
    <StyledButton size="small" color="inherit" onClick={onClick}>
      {buttonText}
    </StyledButton>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: theme.palette.grey[600],
  ':hover': {
    backgroundColor: 'initial',
    textDecoration: 'underline',
  },
}))

export default Switching
