import { useRouter } from 'next/router'
import { IconButton } from '@material-ui/core'

export default function AppBackButton(): JSX.Element {
  const router = useRouter()

  return (
    <IconButton aria-label="To the previous page" onClick={router.back}>
      <span className="material-icons">arrow_back_ios_new</span>
    </IconButton>
  )
}
