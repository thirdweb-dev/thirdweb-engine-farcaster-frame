interface ComputeHtmlParameters {
  postType: string;
  content: string;
  imagePath: string;
}

export const computeHtml = ({
  imagePath,
  postType,
  content,
}: ComputeHtmlParameters) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>${content}</title>
        <meta property="og:title" content="Thirdweb Frames" />
        <meta
          property="og:image"
          content="https://${process.env.NEXT_PUBLIC_VERCEL_URL}${imagePath}"
        />
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://${process.env.NEXT_PUBLIC_VERCEL_URL}${imagePath}"
        />
        <meta
          property="fc:frame:post_url"
          content="https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mint?type=${postType}"
        />
        <meta property="fc:frame:button:1" content="${content}" />
      </head>
      <body>
        <p>${content}</p>
      </body>
    </html>`;
};
