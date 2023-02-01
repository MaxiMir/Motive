import dynamic from 'next/dynamic'
import { Confirmation } from 'entities/confirmation'
import { useUserContext } from 'entities/user'
import { ConfirmationDto } from 'shared/api'
import { useTryFullScreen, useToggle } from 'shared/lib/hooks'

const Stories = dynamic(() => import('features/stories'))

interface ConfirmationStoryProps {
  confirmation: ConfirmationDto
}

function ConfirmationStory({ confirmation }: ConfirmationStoryProps) {
  const user = useUserContext()
  const [open, toggle] = useToggle()
  const { ref, supported, enter, exit } = useTryFullScreen()
  const [mainPhoto] = confirmation.photos
  const stories = [mainPhoto] // TODO confirmation.photos.map

  const onClick = () => {
    toggle()
    enter()
  }

  const onClose = () => {
    exit()
    toggle()
  }

  return (
    <>
      <Confirmation
        id={confirmation.id}
        name={confirmation.goal.name}
        src={mainPhoto.src}
        onClick={onClick}
      />
      {open && (
        <Stories
          user={user}
          stories={stories}
          title={confirmation.goal.name}
          date={confirmation.end}
          fullscreen={{ ref, supported }}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default ConfirmationStory
