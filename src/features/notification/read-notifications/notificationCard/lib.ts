import { blue, deepPurple, grey, orange, red } from '@mui/material/colors'

export function getAvatarSetup(type: string) {
  switch (type) {
    case 'new-goal':
      return { icon: 'target', background: blue[500] }
    case 'new-follower':
      return { icon: 'person_add', background: deepPurple[500] }
    case 'added-points':
      return { icon: 'favorite', background: red[800] }
    case 'new-question':
      return { icon: 'question_mark', background: orange[500] }
    case 'new-support':
      return { icon: 'support', background: orange[500] }
    case 'new-answer':
      return { icon: 'reply', background: orange[500] }
    case 'new-feedback':
      return { icon: 'quick_phrases', background: orange[500] }
    case 'web-coverage':
      return { icon: 'broken_image', background: grey[500] }
  }

  return { icon: 'notifications' }
}
