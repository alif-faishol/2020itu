import { NextPage } from 'next';
import i18n from '@utils/i18n';
import { I18n, TFunction } from 'next-i18next';
import Header from '@components/Header';
import Footer from '@components/Footer';

type AboutPageProps = {
  t?: TFunction;
  i18n?: I18n;
  namespacesRequired: string[];
};

const AboutPage: NextPage<AboutPageProps> = ({ t, i18n: i18nInstance }) => {
  return (
    <>
      <div className="share-container share-container-normal" style={{ background: 'black' }}>
        <Header isInAboutPage />
        <div className="content" style={{ alignItems: 'flex-start' }}>
          <h1 className="text-title-3">#{t('2020itu')}</h1>
          {i18nInstance.language === 'id' ? (
            <p className="text-body-3">
              ingin mengajak kamu untuk share apa yang kamu rasakan selama tahun 2020 ini dalam
              sebuah kata atau emoji.
              <br />
              <br />
              Kita semua tahu bahwa ini bukan tahun yang mudah untuk dilalui sendiri. Bagaimana
              kalau kamu coba tanya kabar 3 temanmu dan ajak mereka untuk berbagi juga di sini?
              <br />
              <br />
              Pantau kabar terbaru dari laman ini di Instagram{' '}
              <a target="__blank" href="https://www.instagram.com/coollab.id/">
                @coollab.id
              </a>
              , ya!
              <br />
              <br />
              <br />
              Jika ada pertanyaan lebih lanjut seputar laman ini, silakan kontak kami melalui email
              <a target="__blank" href="mailto:lets@coollab.id">
                {' '}
                lets@coollab.id
              </a>
              .
              <br />
              <br />
              Kamu bisa juga mengolah input data yang masuk dengan menggunakan API{' '}
              <a target="__blank" href="https://github.com/alif-faishol/2020itu">
                di sini.
              </a>
            </p>
          ) : (
            <p className="text-body-3">
              invites you to share your feeling throughout 2020 as a word or emoji.
              <br />
              <br />
              {
                "We all know this year isn't easy to go through alone. What about asks 3 of your friends to share their feelings here?"
              }
              <br />
              <br />
              {"Don't forget to visit "}
              <a target="__blank" href="https://www.instagram.com/coollab.id/">
                @coollab.id
              </a>{' '}
              on Instagram to keep updated!
              <br />
              <br />
              <br />
              {"If there's any question regarding this page, feel free to contact us via email at"}
              <a target="__blank" href="mailto:lets@coollab.id">
                {' '}
                lets@coollab.id
              </a>
              .
              <br />
              <br />
              {"You can access the data we've gathered via an API "}
              <a target="__blank" href="https://github.com/alif-faishol/2020itu">
                here
              </a>
              .
            </p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default i18n.withTranslation('common')(AboutPage);
