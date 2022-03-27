import { createStyles, makeStyles } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'

interface WalletAddressProps {
  wallet: string
}

export default function WalletAddress({ wallet }: WalletAddressProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox alignItems="flex-end" height={24}>
      <AppTypography variant="caption" className={classes.wallet}>
        {wallet}
      </AppTypography>
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
