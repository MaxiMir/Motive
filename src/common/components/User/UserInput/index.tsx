import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { Box, IconButton } from '@mui/material'
import { TopicDto, MessageType, ClientDto, UserBaseDto } from '@dto'
import { getUserHref } from '@href'
import AppInput from '@ui/AppInput'
import UserAvatar from '@components/User/UserAvatar'
import useForm from './hook'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const AppIcon = dynamic(() => import('@ui/AppIcon'))

interface UserInputProps {
  dayId: number
  user: ClientDto | UserBaseDto
  type: MessageType
  topicId?: number
  onAdd: (topic: TopicDto) => void
}

export default function UserInput({ dayId, user, type, topicId, onAdd }: UserInputProps) {
  const { nickname, name, avatar } = user
  const { formatMessage } = useIntl()
  const form = useForm(dayId, topicId, type, onAdd)
  const { isSubmitting, values, handleSubmit } = form
  const href = getUserHref(nickname)
  const placeholder = formatMessage({ id: `page.user.user-input.${type}` })

  const onClick = () => handleSubmit()

  return (
    <FormikProvider value={form}>
      <Form autoComplete="off">
        <Box display="flex" gap={2} flex={1} mb={2} pr={2}>
          <UserAvatar name={name} avatar={avatar} href={href} size={32} />
          <Field
            name="text"
            placeholder={placeholder}
            variant="standard"
            InputLabelProps={{ shrink: false }}
            disabled={isSubmitting}
            sx={{ flex: 1 }}
            component={AppInput}
          />
          <IconButton disabled={isSubmitting || !values.text} sx={{ width: 40, height: 40 }} onClick={onClick}>
            {!isSubmitting ? (
              <AppIcon name="send" sx={{ paddingLeft: '3px' }} />
            ) : (
              <CircularProgress size="0.9rem" color="primary" />
            )}
          </IconButton>
        </Box>
      </Form>
    </FormikProvider>
  )
}
