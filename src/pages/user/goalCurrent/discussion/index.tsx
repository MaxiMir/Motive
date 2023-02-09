import { Box, Button, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { checkOnOpenDiscussion } from 'entities/discussion'
import { UserBaseDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { useMessages } from './lib'

const DiscussionModal = dynamic(() => import('./discussionModal'))

interface DiscussionProps {
  goalId: number
  dayId: number
  count: number
  owner: UserBaseDto
  clientGoal: boolean
}

export function Discussion({ goalId, dayId, count, owner, clientGoal }: DiscussionProps) {
  const { query } = useRouter()
  const [open, toggle] = useToggle(checkOnOpenDiscussion(query, goalId))
  const messages = useMessages()

  return (
    <>
      <Button sx={{ width: '100%', paddingX: 2, paddingY: '12px' }} onClick={toggle}>
        <Stack direction="row" alignItems="center" gap={1} width="100%">
          <Typography variant="h6" component="p">
            💬
          </Typography>
          <Typography variant="h6" component="p" sx={{ color: 'common.white' }}>
            {messages.header}{' '}
            <Box component="span" sx={{ color: 'zen.silent' }}>
              • {count}
            </Box>
          </Typography>
          <Icon
            name="unfold_more"
            sx={({ palette }) => ({ marginLeft: 'auto', color: palette.grey[700] })}
          />
        </Stack>
      </Button>
      {open && (
        <DiscussionModal
          dayId={dayId}
          count={count}
          owner={owner}
          clientGoal={clientGoal}
          onClose={toggle}
        />
      )}
    </>
  )
}
