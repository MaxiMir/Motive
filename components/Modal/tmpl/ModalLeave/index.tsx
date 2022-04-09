import { Box, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, OwnershipDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
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
      <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" gap={1}>
        <Typography>You will lose all progress...</Typography>
        <AppFadeIcon name="scared" />
      </Box>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    goal: {
      color: theme.palette.zen.sand,
    },
  }),
)
