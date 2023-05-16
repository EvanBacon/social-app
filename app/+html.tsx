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
        {/* TODO: Remove this to allow body scrolling on certain pages */}
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}
