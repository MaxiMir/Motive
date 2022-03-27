import Image from 'next/image'
import { createStyles, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { copyHandler } from 'helpers/dom'
import useSnackbar from 'hooks/useSnackbar'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppIconButton from 'components/UI/AppIconButton'

interface WalletProps {
  name: string
  wallet: string
}

export default function Wallet({ name, wallet }: WalletProps): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()
  const [enqueueSnackbar] = useSnackbar()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true })

  const onCopySuccess = () => enqueueSnackbar({ message: 'Copied', severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })

  const onClick = () => copyHandler(wallet, onCopySuccess, onCopyError)

  return (
    <AppBox flexWrap="wrap" alignItems="center" spacing={1}>
      <Image src={`/images/svg/${name}.svg`} alt="" width={32} height={32} />
      <AppTypography>{name}:</AppTypography>
      {!isMobile && (
        <AppBox alignItems="flex-end" height={24}>
          <AppTypography variant="caption" className={classes.wallet}>
            {wallet}
          </AppTypography>
        </AppBox>
      )}
      <AppIconButton name="content_copy" onClick={onClick} />
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    wallet: {
      color: theme.text.silent,
    },
  }),
)
