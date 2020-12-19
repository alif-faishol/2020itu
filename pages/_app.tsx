import { AppContextType, AppType } from 'next/dist/next-server/lib/utils';
import App from 'next/app';
import i18n from '@utils/i18n';
import '../styles/globals.css';
import vhCheck from 'vh-check';
import { Router } from 'next/router';

if (typeof window !== 'undefined') {
  vhCheck();
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => ({
  ...(await App.getInitialProps(appContext)),
});

export default i18n.appWithTranslation(MyApp);
