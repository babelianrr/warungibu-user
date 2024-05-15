import Head from 'next/head'
import Link from 'next/link'
import {formatDistance} from 'date-fns'

import MainLayout from '@/components/layouts/MainLayout'
import {fetchGet} from 'helpers/fetch'

export default function News({news}) {
  return (
    <MainLayout>
      <Head>
        <title>Warung Ibu</title>
        <meta name="description" content="Create by Warung Ibu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <h2 className="text-dnr-turqoise text-xl sm:text-2xl  leading-7 tracking-wider text-center my-10">
            Info dan Berita Terbaru
          </h2>
          <div className="bg-gray-50 mb-10 grid grid-cols-4">
            {news.map((post) => (
              <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden mx-4 h-96 mb-10">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={post.image} alt="" />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <Link href={`/news/${post.slug}`}>
                      <a className="block mt-2">
                        <p className="text-xl font-semibold text-dnr-dark-turqoise hover:underline">{post.title}</p>
                      </a>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex text-sm text-gray-500 justify-between w-full">
                      <time dateTime={post.created_at}>
                        {formatDistance(new Date(post.created_at), new Date(), {addSuffix: true})}
                      </time>
                      <Link href={`/news/${post.slug}`}>
                        <a>
                          <p className="text-sm text-dnr-dark-turqoise hover:underline">Baca Selengkapnya</p>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const news = await fetchGet('news')
  return {
    props: {
      news,
    },
  }
}
