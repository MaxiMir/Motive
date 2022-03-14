import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto, OwnershipDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import { useSendUnsubscribe } from './hook'

export interface ModalUnsubscribeProps {
  tmpl: 'unsubscribe'
  goal: GoalDto
  clientOwnership: OwnershipDto
  onClose: () => void
}

export default function ModalUnsubscribe({ goal, clientOwnership, onClose }: ModalUnsubscribeProps): JSX.Element {
  const { id, name } = goal
  const classes = useStyles()
  const { isLoading, mutateAsync } = useSendUnsubscribe(id, clientOwnership.page)

  const onClick = () => {
    if (clientOwnership.member) {
      mutateAsync(clientOwnership.member?.id).then(onClose)
    }
  }

  return (
    <AppModal
      title={
        <>
          Leave <span className={classes.goal}>{name}</span>?
        </>
      }
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Leave"
          nameLoading="Leaving"
          emoji="unsubscribe"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <AppBox flexDirection="column" justifyItems="center" alignItems="center" spacing={1}>
        <AppTypography>You will lose all progress...</AppTypography>
        <AppFadeIcon name="scared" />
      </AppBox>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    goal: {
      color: theme.text.sand,
    },
  }),
)
