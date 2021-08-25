import Image from 'next/image'
import { createStyles, makeStyles } from '@material-ui/core/styles'

interface GoalCardFeedbackPhotoProps {
  photo: string
}

export default function GoalCardFeedbackPhoto({ photo }: GoalCardFeedbackPhotoProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Image src={photo} objectFit="cover" layout="fill" />
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      position: 'relative',
      flex: '1 1 150px',
      maxWidth: 220,
      height: 150,
      border: `1px solid ${theme.palette.warning.light}`,
      borderRadius: 5,
      overflow: 'hidden',
    },
  }),
)
