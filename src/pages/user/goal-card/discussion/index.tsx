import { Box, Button, Stack, Typography } from '@mui/material'
import { brown } from '@mui/material/colors'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { checkOnOpenDiscussion } from 'entities/discussion'
import { DayDto, UserBaseDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'

const DiscussionModal = dynamic(() => import('./discussion-modal'))

interface DiscussionProps {
  goalId: number
  day: DayDto
  owner: UserBaseDto
  viewerGoal: boolean
}

export function Discussion({ goalId, day, owner, viewerGoal }: DiscussionProps) {
  const { query } = useRouter()
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle(checkOnOpenDiscussion(query, goalId))
  const header = formatMessage({ id: 'common.discussion' })

  return (
    <>
      <Button
        color="inherit"
        sx={{ width: '100%', paddingX: 2, paddingY: '12px' }}
        onClick={toggle}
      >
        <Stack direction="row" alignItems="center" gap={1} width="100%">
          <Icon name="forum" color={brown[400]} />
          <Typography variant="h6" component="p">
            {header}{' '}
            <Box component="span" color="zen.silent">
              • {day.topicCount}
            </Box>
          </Typography>
          <Icon
            name="unfold_more"
            sx={(theme) => ({ marginLeft: 'auto', color: theme.palette.grey[700] })}
          />
        </Stack>
      </Button>
      {open && <DiscussionModal day={day} owner={owner} viewerGoal={viewerGoal} onClose={toggle} />}
    </>
  )
}
