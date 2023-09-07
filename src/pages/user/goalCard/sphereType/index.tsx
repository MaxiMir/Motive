import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { SphereDto } from 'shared/api'

interface SphereTypeProps {
  sphere: SphereDto
}

export function SphereType({ sphere }: SphereTypeProps) {
  const { formatMessage } = useIntl()
  const name = formatMessage({ id: `common.${sphere}` })

  return <StyledTypography variant="caption">{name}</StyledTypography>
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}))
