import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { Route } from 'shared/config'

function OwnerDescription() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.owner-description.title' })
  const subtitle = formatMessage({ id: 'page.user.owner-description.subtitle' })
  const description = formatMessage({ id: 'page.user.owner-description.description' })
  const link = formatMessage({ id: 'page.user.owner-description.link' })

  const onClick = () => {
    document.querySelector<HTMLElement>('[data-unit=create-goal]')?.click()
  }

  return (
    <>
      <Typography>
        {title}{' '}
        <StyledTypography color="primary" component="span" onClick={onClick}>
          {subtitle}
        </StyledTypography>
      </Typography>
      <Typography>
        {description}{' '}
        <Box component="span" color="warning.light">
          <Link href={Route.Search}>{link}</Link>
        </Box>
      </Typography>
    </>
  )
}

const StyledTypography = styled(Typography)({
  cursor: 'pointer',
}) as typeof Typography

export default OwnerDescription
