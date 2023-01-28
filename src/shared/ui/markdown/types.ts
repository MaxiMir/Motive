import { LinkProps, TypographyProps } from '@mui/material'

export type MarkdownLinkProps = Pick<LinkProps, 'href' | 'title' | 'className' | 'key' | 'children'>

export type MarkdownTypographyProps = Pick<TypographyProps, 'children'>
