import Link from 'next/link'
import { useRouter } from 'next/router'
import { Viewer } from 'entities/viewer'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

interface UserProps {
  user: Viewer
}

function User({ user }: UserProps) {
  const { asPath } = useRouter()
  const href = joinToHref(user.nickname)
  const selected = asPath.includes(href)

  return (
    <Link href={href}>
      <Avatar src={user.avatar} name={user.name} size={24} sx={{ opacity: !selected ? 0.6 : 1 }} />
    </Link>
  )
}

export default User
