import fs from 'fs'
import path from 'path'
import { Typography } from '@mui/material'
import matter from 'gray-matter'
import Markdown from 'markdown-to-jsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import { GetStaticPathsResult } from 'next/types'
// eslint-disable-next-line boundaries/element-types
import { Layout } from 'app/layout'
import { Article as ArticleProps } from 'entities/article'
import { useFormatDate } from 'shared/lib/hooks'
import Container from 'shared/ui/Container'

function Article({ meta, content }: ArticleProps) {
  const formatDate = useFormatDate()
  const date = formatDate(meta.date, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Layout title={meta.title} description={meta.description}>
      <Container
        sx={{
          '& img': {
            maxWidth: '100%',
            borderRadius: 3,
            mb: 2,
          },
        }}
      >
        <Typography
          variant="caption"
          component="time"
          dateTime={meta.date}
          mb={1}
          sx={{ color: 'zen.silent' }}
        >
          {date}
        </Typography>
        <Typography variant="h1" mb={2}>
          {meta.header}
        </Typography>
        <Markdown options={{ overrides: { p: Typography } }}>{content}</Markdown>
      </Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const folders = fs.readdirSync(path.join('articles'))
  const paths = folders.reduce<GetStaticPathsResult['paths']>((acc, id) => {
    const localePaths = locales.map((locale) => ({ params: { id }, locale }))

    return [...acc, ...localePaths]
  }, [])

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const markdownPath = path.join(`articles/${params?.id}/${locale}.md`)
  const markdownWithMeta = fs.readFileSync(markdownPath, 'utf-8')
  const { data, content } = matter(markdownWithMeta)

  return {
    props: {
      meta: JSON.parse(JSON.stringify(data)),
      content,
    },
  }
}

export default Article
