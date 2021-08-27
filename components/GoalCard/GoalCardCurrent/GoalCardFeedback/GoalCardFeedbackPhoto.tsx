import Image from 'next/image'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppZoom from 'components/UI/AppZoom'

interface GoalCardFeedbackPhotoProps {
  photo: string
}

export default function GoalCardFeedbackPhoto({ photo }: GoalCardFeedbackPhotoProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppZoom>
      <div className={classes.container}>
        <Image src={photo} objectFit="cover" layout="fill" />
      </div>
    </AppZoom>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'relative',
      width: 90,
      paddingBottom: 90,
      border: `1px solid ${theme.palette.warning.light}`,
      borderRadius: 5,
      overflow: 'hidden',
      [theme.breakpoints.up('md')]: {
        width: 150,
        paddingBottom: 150,
      },
    },
  }),
)
