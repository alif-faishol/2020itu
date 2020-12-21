import { AppContextType, AppType } from 'next/dist/next-server/lib/utils';
import App from 'next/app';
import i18n from '@utils/i18n';
import '../styles/globals.css';
import vhCheck from 'vh-check';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '@utils/gtag';

if (typeof window !== 'undefined') {
  vhCheck();
}

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => ({
  ...(await App.getInitialProps(appContext)),
});

export default i18n.appWithTranslation(MyApp);
