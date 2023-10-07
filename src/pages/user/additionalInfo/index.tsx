import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const AdditionalInfoModal = dynamic(() => import('./additionalInfoModal'))

interface AdditionalInfoProps {
  user: UserPageDto
}

function AdditionalInfo({ user }: AdditionalInfoProps) {
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const infoText = formatMessage({ id: 'common.info' })

  return (
    <>
      <StyledButton
        size="small"
        variant="text"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<Icon name="info" />}
        onClick={toggle}
      >
        {infoText}
      </StyledButton>
      {open && <AdditionalInfoModal user={user} onClose={toggle} />}
    </>
  )
}

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 'initial',
  marginTop: 8,
  padding: 0,
  color: theme.palette.grey[500],
  '&:hover': {
    background: 'none',
  },
}))

export default AdditionalInfo
