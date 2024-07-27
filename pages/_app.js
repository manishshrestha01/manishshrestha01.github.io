import 'tailwindcss/tailwind.css';
import '../styles/index.css';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Import Google Analytics tracking functions
import { GA_TRACKING_ID, pageview } from '../lib/gtag';

// Log Measurement ID from environment variables
console.log('GA Measurement ID from environment:', GA_TRACKING_ID);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_TRACKING_ID) return; // Exit if GA_TRACKING_ID is not available

    // Function to handle route changes and track pageviews
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
      }
    };

    // Track pageviews on route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Track the initial page load
    handleRouteChange(router.asPath);

    // Clean up event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {GA_TRACKING_ID && (
        <>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
