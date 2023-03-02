import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticProps } from 'next'
import { Layout } from 'app/layout'
import { ArticlesPage } from 'pages/articles'
import { Article } from 'entities/article'
import { getArticleHref, useMeta } from 'entities/page'

interface ArticlesProps {
  articles: Article[]
}

function Articles({ articles }: ArticlesProps) {
  const meta = useMeta('articles')

  return (
    <Layout title={meta.title} description={meta.description}>
      <ArticlesPage articles={articles} />
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const folders = fs.readdirSync(path.join('articles'))
  const data = folders.map((id) => {
    const href = getArticleHref(id)
    const markdownWithMeta = fs.readFileSync(path.join(`articles/${id}/${locale}.md`), 'utf-8')
    const { data: meta, content } = matter(markdownWithMeta)

    return { meta, href, content }
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
