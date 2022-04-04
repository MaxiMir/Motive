import { FC } from 'react'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'
import { TypographyProps } from '@material-ui/core'
import useLocale from 'hooks/useLocale'

interface AppLinkProps {
  href: string
  title?: string
  className?: string
  variant?: TypographyProps['variant']
}

const AppLink: FC<AppLinkProps> = ({ href, title, className, ...restProps }) => {
  const { locale } = useLocale()

  return (
    <Link href={href} locale={locale}>
      <MaterialLink href={href} title={title} color="inherit" className={className} {...restProps} />
    </Link>
  )
}

export default AppLink
