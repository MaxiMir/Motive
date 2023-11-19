import { Box, Typography, Link } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { Route } from 'shared/config'
import { SelectLanguage } from './select-language'

function Footer() {
  const { formatMessage } = useIntl()
  const year = new Date().getFullYear()
  const privacyPolicyText = formatMessage({ id: 'common.privacy-policy' })
  const contactText = formatMessage({ id: 'common.contact' })

  return (
    <Box component="footer" py={2}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <SelectLanguage />
          <Box sx={{ color: 'zen.silent' }}>•</Box>
          <FooterLink href={Route.PrivacyPolicy}>{privacyPolicyText}</FooterLink>
          <Box sx={{ color: 'zen.silent' }}>•</Box>
          <FooterLink href={Route.Contact}>{contactText}</FooterLink>
        </Box>
        <Typography variant="caption" color="zen.silent">
          © {year} {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
      </Box>
    </Box>
  )
}

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.zen.silent,
  lineHeight: 2.1,
  fontSize: 12,
}))

export default Footer
