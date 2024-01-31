import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content={`Thirdweb Frame`} />
        <meta property="og:image" content={`<next_js_image_path>`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`<next_js_image_path>`} />
        <meta property="fc:frame:post_url" content={`<next_js_image_path>`} />
        <meta property="fc:frame:button:1" content="Get started" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
