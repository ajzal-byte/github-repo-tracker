"use client"
import '@/styles/globals.css';
import { Analytics } from '@/components/analytics';
import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const isDashboardPage = pathname === '/dashboard';

  return (
    <>
      <html
        lang="en"
        className={`${fontSans.variable} ${fontMono.variable}`}
        suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              {!isDashboardPage && <SiteHeader />}
              <div className="flex-1">{children}</div>
            </div>
            <Analytics />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
