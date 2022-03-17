import { useSendCreateMember } from 'views/UserView/hook'
import AppBox from 'components/UI/AppBox'
import Action from 'components/Action'

interface RepeatProps {
  goalId: number
}

export default function Repeat({ goalId }: RepeatProps): JSX.Element {
  const { isLoading, mutate } = useSendCreateMember()

  const onClick = () => {
    mutate({ goalId })
  }

  return (
    <AppBox justifyContent="flex-end">
      <Action
        tmpl="submit"
        isLoading={isLoading}
        name="Repeat"
        nameLoading="Repeating"
        emoji="join"
        onClick={onClick}
      />
    </AppBox>
  )
}
