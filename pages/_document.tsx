import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

import { GA_TRACKING_ID } from '@utils/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&family=Poppins:wght@500;700&display=swap"
            rel="stylesheet"
          />
          <title>#2020itu</title>
          <meta name="title" content="#2020itu" />
          <meta
            name="description"
            content="Kami ingin mengajak kamu untuk share apa yang kamu rasakan selama tahun 2020 ini dalam sebuah kata atau emoji."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://2020itu.com" />
          <meta property="og:title" content="#2020itu" />
          <meta
            property="og:description"
            content="Kami ingin mengajak kamu untuk share apa yang kamu rasakan selama tahun 2020 ini dalam sebuah kata atau emoji."
          />
          <meta property="og:image" content="/images/og_image.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://2020itu.com" />
          <meta property="twitter:title" content="#2020itu" />
          <meta
            property="twitter:description"
            content="Kami ingin mengajak kamu untuk share apa yang kamu rasakan selama tahun 2020 ini dalam sebuah kata atau emoji."
          />
          <meta property="twitter:image" content="/images/og_image.png" />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
