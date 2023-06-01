import { Box, Button, Stack, Typography } from '@mui/material'
import { lightBlue, red, yellow } from '@mui/material/colors'
import { styled } from '@mui/system'
import { compiler } from 'markdown-to-jsx'
import { useIntl } from 'react-intl'
import Image from 'next/image'
// eslint-disable-next-line import/no-internal-modules
import ContactsSrc from 'public/images/contacts.webp'
import Container from 'shared/ui/Container'
import { Email, LinkedIn, Telegram } from 'shared/ui/icons'

export function ContactPage() {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.contact.header' })
  const content = compiler(formatMessage({ id: 'page.contact.content' }), {
    wrapper: null,
    overrides: { p: Typography },
  })
  const email = `mailto:${process.env.NEXT_PUBLIC_APP_EMAIL}`

  return (
    <Container>
      <Stack gap={3} mb={6}>
        <Typography variant="h1" component="h1">
          📮 {header}
        </Typography>
        {content}
        <Stack
          flexDirection={{
            xs: 'column',
            lg: 'row',
          }}
          alignItems="center"
          gap={2}
        >
          <Stack
            flexDirection={{
              xs: 'row',
              lg: 'column',
            }}
            gap={2}
          >
            <ButtonLink
              variant="outlined"
              color="inherit"
              href={email}
              target="_blank"
              rel="noopener"
              sx={{
                borderColor: yellow[500],
                ':hover': {
                  borderColor: yellow[100],
                },
              }}
            >
              <Stack alignItems="center" gap={1}>
                <Typography variant="caption">Email</Typography>
                <Email sx={{ color: yellow[500] }} />
              </Stack>
            </ButtonLink>
            <ButtonLink
              variant="outlined"
              color="inherit"
              href="https://www.linkedin.com/in/maximir"
              target="_blank"
              rel="noopener"
              sx={{
                borderColor: red[300],
                ':hover': {
                  borderColor: red[100],
                },
              }}
            >
              <Stack alignItems="center" gap={1}>
                <Typography variant="caption">LinkedIn</Typography>
                <LinkedIn sx={{ color: red[300] }} />
              </Stack>
            </ButtonLink>
            <ButtonLink
              variant="outlined"
              color="inherit"
              href="https://t.me/MaximMir"
              target="_blank"
              rel="noopener"
              sx={{
                borderColor: lightBlue[500],
                ':hover': {
                  borderColor: lightBlue[100],
                },
              }}
            >
              <Stack alignItems="center" gap={1}>
                <Typography variant="caption">Telegram</Typography>
                <Telegram sx={{ color: lightBlue[500] }} />
              </Stack>
            </ButtonLink>
          </Stack>
          <Box display="flex" justifyContent="center" flex={1}>
            <Image src={ContactsSrc} alt="Binance" width={300} height={186} />
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}

const ButtonLink = styled(Button)({
  width: 80,
  height: 80,
  borderRadius: 12,
}) as typeof Button
