import { Box, Typography, Link as MuiLink, LinkProps } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { ChangeLanguage } from 'features/locale/change-language'
import { Route } from 'shared/config'

interface FooterProps {
  breakpoints?: boolean
}

function Footer({ breakpoints }: FooterProps) {
  const { formatMessage } = useIntl()
  const year = new Date().getFullYear()
  const privacyPolicyText = formatMessage({ id: 'common.privacy-policy' })
  const contactText = formatMessage({ id: 'common.contact' })

  return (
    <Box
      component="footer"
      py={2}
      sx={{
        display: !breakpoints
          ? undefined
          : {
              xs: 'none',
              xl: 'block',
            },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <ChangeLanguage />
          <Box sx={{ color: 'zen.silent' }}>•</Box>
          <FooterLink href={Route.PrivacyPolicy}>{privacyPolicyText}</FooterLink>
          <Box sx={{ color: 'zen.silent' }}>•</Box>
          <FooterLink href={Route.Contact}>{contactText}</FooterLink>
        </Box>
        <Typography variant="caption" sx={{ color: 'zen.silent' }}>
          © {year} {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
      </Box>
    </Box>
  )
}

const FooterLink = styled(({ children, ...props }: LinkProps) => (
  <MuiLink {...props} component={Link}>
    {children}
  </MuiLink>
))(({ theme }) => ({
  color: theme.palette.zen.silent,
  lineHeight: 2.1,
  fontSize: 12,
}))

export default Footer
