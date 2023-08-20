import { IconButton, Stack } from '@mui/material'
import { blue } from '@mui/material/colors'
import { styled } from '@mui/system'
import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { Viewer } from 'entities/viewer'
import { TopicType, UserBaseDto } from 'shared/api'
import Avatar from 'shared/ui/avatar'
import Input from 'shared/ui/Input'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useCreateTopicForm } from '../model'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const InputAdornment = dynamic(() => import('@mui/material/InputAdornment'))
const Typography = dynamic(() => import('@mui/material/Typography'))
const SupportSign = dynamic(() => import('entities/discussion').then((m) => m.SupportSign))
const Icon = dynamic(() => import('shared/ui/Icon'))
const SelectingType = dynamic(() => import('./selectingType'))

interface CreateTopicProps {
  type: TopicType
  topicId?: number
  dayId: number
  owner: UserBaseDto
  user: Viewer | UserBaseDto
  viewerGoal?: boolean
  replyTo?: string
  autoFocus?: boolean
  onSuccess?: () => void
}

function CreateTopic({
  type,
  topicId,
  dayId,
  owner,
  user,
  viewerGoal,
  replyTo,
  autoFocus,
  onSuccess,
}: CreateTopicProps) {
  const { name, avatar } = user
  const { formatMessage } = useIntl()
  const form = useCreateTopicForm(dayId, topicId, type, onSuccess)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const disabled = isSubmitting || !values.text
  const supportSign = values.type === 'support' && !viewerGoal
  const selectingType = !viewerGoal && values.text && !replyTo
  const sendText = formatMessage({ id: 'common.send' })
  const placeholder = formatMessage({ id: 'common.message' })

  const setType = (value: TopicType) => setFieldValue('type', value)

  const onClick = () => handleSubmit()

  return (
    <FormikProvider value={form}>
      <Form>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" flex={1} gap={1}>
            <Avatar src={avatar} name={name} size={32} />
            <Field
              name="text"
              placeholder={placeholder}
              InputLabelProps={{ shrink: false }}
              disabled={isSubmitting}
              autoComplete="off"
              autoFocus={autoFocus}
              multiline
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {replyTo && <Typography color="primary">{replyTo}</Typography>}
                    {supportSign && <SupportSign name={owner.name} />}
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  flex: 1,
                },
              }}
              component={Input}
            />
            <TooltipArrow title={sendText}>
              <SendButton size="small" color="inherit" disabled={disabled} onClick={onClick}>
                {isSubmitting ? (
                  <CircularProgress size={14.5} />
                ) : (
                  <Icon name="arrow_upward" fontSize={19} />
                )}
              </SendButton>
            </TooltipArrow>
          </Stack>
          {selectingType && <SelectingType owner={owner} type={values.type} setType={setType} />}
        </Stack>
      </Form>
    </FormikProvider>
  )
}

const SendButton = styled(IconButton)({
  borderColor: blue[800],
  backgroundColor: blue[800],
  ':hover': {
    backgroundColor: blue[400],
  },
})

export default CreateTopic
