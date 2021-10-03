import { FC } from 'react'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'
import { TypographyProps } from '@material-ui/core/'

interface AppLinkProps {
  href: string
  title?: string
  className?: string
  variant?: TypographyProps['variant']
}

const AppLink: FC<AppLinkProps> = ({ href, title, className, ...restProps }) => (
  <Link href={href}>
    <MaterialLink href={href} title={title} color="inherit" className={className} {...restProps} />
  </Link>
)

export default AppLink
