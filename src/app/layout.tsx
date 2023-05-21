import './styles/globals.css'
export const metadata = {
  title: 'Luxury Escapes',
  description: 'Tinder App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
          <title>Tinder App</title>
      </head>
      <body className={'font-suisse-intl  bg-gray-200'}>{children}</body>
    </html>
  )
}
