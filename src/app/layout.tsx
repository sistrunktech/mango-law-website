import type { Metadata } from 'next';
import Script from 'next/script';
import Providers from './providers';
import './globals.css';
import { SITE_URL } from '@/lib/seo-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Criminal Defense - OVI Attorney in Ohio | Mango Law',
    template: '%s | Mango Law',
  },
  description:
    'Aggressive and experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI, drug crimes, assault, sex crimes, and white collar cases.',
  openGraph: {
    type: 'website',
    siteName: 'Mango Law LLC',
    title: 'Criminal Defense - OVI Attorney in Ohio | Mango Law',
    description:
      'Aggressive and experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI, drug crimes, assault, sex crimes, and white collar cases.',
    url: SITE_URL,
    images: [
      {
        url: '/images/brand/mango-logo-primary-fullcolor.svg',
        width: 1200,
        height: 630,
        alt: 'Mango Law LLC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Criminal Defense - OVI Attorney in Ohio | Mango Law',
    description:
      'Aggressive and experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI, drug crimes, assault, sex crimes, and white collar cases.',
    images: ['/images/brand/mango-logo-primary-fullcolor.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="consent-mode" strategy="beforeInteractive">
          {`(function(){var cookieName='ml_consent_v2';var defaultConsent={analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'};function readCookie(name){var match=document.cookie.match(new RegExp('(?:^|; )'+name.replace(/([.$?*|{}()\\[\\]\\\\/+^])/g,'\\\\$1')+'=([^;]*)'));return match?decodeURIComponent(match[1]):null;}function readConsent(){try{var raw=readCookie(cookieName);return raw?JSON.parse(raw):null;}catch(e){return null;}}function writeConsent(next){try{var value=encodeURIComponent(JSON.stringify(next));var cookie=cookieName+'='+value+'; path=/; max-age=31536000; SameSite=Lax';if(location.protocol==='https:'){cookie+='; Secure';}document.cookie=cookie;}catch(e){}}window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('consent','default',defaultConsent);var stored=readConsent();if(stored){gtag('consent','update',stored);}window.__mlConsent={cookieName:cookieName,get:readConsent,update:function(next){writeConsent(next);gtag('consent','update',next);}};})();`}
        </Script>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WLJQZKB5');`}
        </Script>
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLJQZKB5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
