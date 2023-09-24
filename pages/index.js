import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { RoughNotation } from 'react-rough-notation'
import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Hello World! 👋🏾
          </h1>
          <Image
            src="/static/images/main.jpg"
            alt="let's talkZ"
            layout="responsive" // Set layout to "responsive"
            width={1200} // Set the desired width (this can be any large width since it's responsive)
            height={600} // Set the desired height (this can be any large height since it's responsive)
          />
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Welcome to{' '}
            <RoughNotation
              type="underline"
              show={true}
              color="#13b57b"
              animationDelay={1400}
              animationDuration={1200}
            >
              Let&#39;s TalkZ!{' '}
            </RoughNotation>
          </h2>

          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-600 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            A place where we talk about finance and future.
          </h2>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Welcome to Let's TalkZ, your go-to destination for all things money, finance, and future
            planning. Our mission is to empower individuals with the knowledge and resources they
            need to make well-informed financial decisions. We're dedicated to delivering top-notch,
            engaging content that combines information with entertainment.
          </p>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {' '}
            Whether you're a seasoned investor looking to expand your portfolio or just embarking on
            your financial journey, we invite you to be a part of our community at Let's TalkZ.
            We're here to guide you through the intricate world of finance, helping you shape the
            future you aspire to achieve. Join us today!
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
