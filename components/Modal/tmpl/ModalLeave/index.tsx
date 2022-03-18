import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto, OwnershipDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import { useSendRemoveMember } from './hook'

export interface ModalLeaveProps {
  tmpl: 'leave'
  goal: GoalDto
  clientOwnership: OwnershipDto
  onClose: () => void
}

export default function ModalLeave({ goal, clientOwnership, onClose }: ModalLeaveProps): JSX.Element {
  const { id, name } = goal
  const classes = useStyles()
  const { isLoading, mutateAsync } = useSendRemoveMember(id, clientOwnership.page)

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
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isLoading}
          name="Leave"
          nameLoading="Leaving"
          emoji="leave"
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