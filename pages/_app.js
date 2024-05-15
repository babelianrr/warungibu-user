// import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/base.css'
import 'tailwindcss/tailwind.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import Head from 'next/head'
import Header from '@/components/layouts/Header'
import {CartCountProvider} from 'contexts/CartCountContext'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartCountProvider>
        <div className="font-sans bg-dnr-gray min-h-screen">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
      </Head> */}
          {/* <Header /> */}
          {/* <div className="max-w-screen-xl mx-auto"> */}
          <Component {...pageProps} />
          {/* </div> */}
        </div>
      </CartCountProvider>
    </QueryClientProvider>
  )
}

export default MyApp
