import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import { Layout } from 'app/layout'
import { BlogPage } from 'pages/blog'
import { Article } from 'entities/article'
import { getBlogHref, useMeta } from 'entities/page'

interface ArticlesProps {
  articles: Article[]
}

function Blog({ articles }: ArticlesProps) {
  const meta = useMeta('blog')

  return (
    <Layout title={meta.title} description={meta.description}>
      <BlogPage articles={articles} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const folders = fs.readdirSync(path.join('blog'))
  const articlesInfo = folders.map((id) => {
    const href = getBlogHref(id)
    const input = fs.readFileSync(path.join(`blog/${id}/${locale}.md`), 'utf-8')
    const { data } = matter(input)

    return { data, href }
  })
  const parsed: Article[] = JSON.parse(JSON.stringify(articlesInfo))
  const articles = parsed.sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date))

  return {
    props: {
      articles,
    },
  }
}

export default Blog
