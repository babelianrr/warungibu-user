import Head from 'next/head'
import Link from 'next/link'
import {formatDistance} from 'date-fns'

import MainLayout from '@/components/layouts/MainLayout'
import {fetchGet} from 'helpers/fetch'

export default function NewsDetail({data}) {
  return (
    <MainLayout>
      <Head>
        <title>Warung Ibu</title>
        <meta name="description" content="Create by BIG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="px-4 sm:px-0 sm:max-w-screen-lg lg:max-w-screen-lg xl:max-w-screen-4xl mx-auto">
          <div className="bg-gray-50 my-10 flex justify-center border">
            <img className="object-cover h-full w-full object-center" alt={data.title} src={data.image} />
          </div>
          <div className="text-sm text-gray-500 mb-10">
            <p className="text-dnr-turqoise text-xl sm:text-2xl  leading-7">{data.title}</p>
            <time dateTime={data.created_at}>
              {formatDistance(new Date(data.created_at), new Date(), {addSuffix: true})}
            </time>
          </div>
          <div className="mb-10">
            <Content content={data.content} />
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

function Content({content}) {
  if (!content) return <span>-</span>

  return <p className="text-gray-600 mb-4 text-justify leading-relaxed" dangerouslySetInnerHTML={{__html: content}}></p>
}

export async function getStaticProps(context) {
  const data = await fetchGet(`news/${context.params.slug}`)
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const data = await fetchGet(`news`)

  const paths = data.map((post) => ({
    params: {slug: post.slug},
  }))

  return {paths, fallback: false}
}
