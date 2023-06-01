import { Box, Stack, Typography } from '@mui/material'
import { compiler } from 'markdown-to-jsx'
import { useIntl } from 'react-intl'
import Image from 'next/image'
// eslint-disable-next-line import/no-internal-modules
import BinanceSrc from 'public/images/binance.webp'
import { MY_WALLETS, Wallet } from 'entities/donate'
import Container from 'shared/ui/Container'

export function DonatePage() {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'common.donate' })
  const content = compiler(formatMessage({ id: 'page.donate.content' }), {
    wrapper: null,
    overrides: { p: Typography },
  })

  return (
    <Container>
      <Stack gap={3}>
        <Typography variant="h1" component="h1">
          🪙 {header}
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
            flexWrap="wrap"
            gap={1}
          >
            {MY_WALLETS.map(({ name, wallet, src }) => (
              <Wallet name={name} wallet={wallet} src={src} key={name} />
            ))}
          </Stack>
          <Box display="flex" justifyContent="flex-end" flex={1}>
            <Image src={BinanceSrc} alt="" width={136} height={136} />
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}
