import React from 'react'
import {ScrollViewStyleReset} from 'expo-router/html'

export default function Root({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `/* Remove default link styling */
 a {
    color: inherit;
  }
  a[role="link"]:hover {
    text-decoration: underline;
  }
  a[role="link"][data-no-underline="1"]:hover {
    text-decoration: none;
  }

  /* Styling hacks */
  *[data-word-wrap] {
    word-break: break-word;
  }

  /* ProseMirror */
  .ProseMirror {
    font: 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    min-height: 140px;
  }
  .ProseMirror-dark {
    color: white;
  }
  .ProseMirror p {
    margin: 0;
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #8d8e96;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  .ProseMirror .mention {
    color: #0085ff;
  }
  .ProseMirror a {
    color: #0085ff;
    cursor: pointer;
  }
  /* OLLIE: TODO -- this is not accessible */
  /* Remove focus state on inputs */
  .ProseMirror-focused {
    outline: 0;
  }
  input:focus {
    outline: 0;
  }
  .tippy-content .items {
    width: fit-content;
  }`,
          }}></style>
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}
