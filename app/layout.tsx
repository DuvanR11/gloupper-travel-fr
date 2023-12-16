
import { Nunito } from 'next/font/google'



import './globals.css'
import ClientOnly from '@/components/layouts/ClientOnly';
import { UiProvider } from '@/context/ui';
import { ToasterProvider, ModalsProvider } from '@/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Gloupper Travel',
  description: 'Gloupper Travel',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <ModalsProvider/>
        </ClientOnly>
        <div>
          <UiProvider>
            {children}
          </UiProvider>
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
