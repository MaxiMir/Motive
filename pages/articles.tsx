import fs from 'fs'
import path from 'path'
import { Typography } from '@mui/material'
import matter from 'gray-matter'
import Markdown from 'markdown-to-jsx'
import { GetStaticProps } from 'next'
import { Layout } from 'app/layout'
import { Article } from 'entities/article'
import Container from 'shared/ui/Container'

interface ArticlesProps {
  articles: Article[]
}

function Articles({ articles }: ArticlesProps) {
  return (
    <Layout title="" description="">
      <Container>
        <Typography variant="h1" mb={3}>
          Articles !!!!
        </Typography>
        {articles.map(({ meta }) => (
          <Markdown key={meta.title}>{meta.title}</Markdown>
        ))}
      </Container>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const folders = fs.readdirSync(path.join('articles'))
  const data = folders.map((id) => {
    const markdownWithMeta = fs.readFileSync(path.join(`articles/${id}/${locale}.md`), 'utf-8')
    const { data: meta, content } = matter(markdownWithMeta)

    return { id, meta, content }
  })
  const parsed: Article[] = JSON.parse(JSON.stringify(data))
  const articles = parsed.sort(
    (a, b) => Number(new Date(b.meta.date)) - Number(new Date(a.meta.date)),
  )

  return {
    props: {
      articles,
    },
  }
}

export default Articles
