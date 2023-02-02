import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Days+One&family=Kumbh+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preload" href="/fonts/Circular/Circular-Light.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Circular/Circular-Book.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Circular/Circular-Medium.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Circular/Circular-Bold.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Circular/Circular-Black.otf" as="font" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
