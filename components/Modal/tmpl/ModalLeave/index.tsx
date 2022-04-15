import { Box, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, OwnershipDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import { useSendRemoveMember } from './hook'
import i18n from './i18n'

export interface ModalLeaveProps {
  tmpl: 'leave'
  goal: GoalDto
  clientOwnership: OwnershipDto
  onClose: () => void
}

export default function ModalLeave({ goal, clientOwnership, onClose }: ModalLeaveProps): JSX.Element {
  const { id, name } = goal
  const classes = useStyles()
  const { locale } = useLocale()
  const { isLoading, mutateAsync } = useSendRemoveMember(id, clientOwnership.page)
  const { title, button, buttonLoading, subtitle } = i18n[locale]

  const onClick = () => {
    if (!clientOwnership.member) return

    mutateAsync(clientOwnership.member?.id).then(onClose)
  }

  return (
    <AppModal
      title={
        <>
          {title} <span className={classes.goal}>{name}</span>?
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isLoading}
          name={button}
          nameLoading={buttonLoading}
          emoji="leave"
          onClick={onClick}
        />,
      ]}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" justifyItems="center" alignItems="center" gap={1}>
        <Typography>{subtitle}</Typography>
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
