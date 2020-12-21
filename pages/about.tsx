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

const AboutPage: NextPage<AboutPageProps> = ({ i18n: i18nInstance }) => {
  return (
    <>
      <div className="share-container share-container-normal" style={{ background: 'black' }}>
        <Header isInAboutPage />
        <div className="content" style={{ alignItems: 'flex-start' }}>
          {i18nInstance.language === 'id' ? (
            <>
              <h1 className="text-title-3">Tentang #2020itu</h1>
              <p className="text-body-3">
                Kami ingin mengajak kamu untuk share apa yang kamu rasakan selama tahun 2020 ini
                dalam sebuah kata atau emoji. Ini adalah salah satu #weekendproject dari{' '}
                <a target="__blank" href="https://coollab.id/">
                  Coollab.id{' '}
                </a>
                yang diinisiasi{' '}
                <a target="__blank" href="https://www.instagram.com/erdry/">
                  @erdry
                </a>{' '}
                dan{' '}
                <a target="__blank" href="https://www.linkedin.com/in/alif-faishol-b79231a5">
                  Alif
                </a>
                .
                <br />
                <br />
                Kita semua tahu bahwa ini bukan tahun yang mudah untuk dilalui sendiri. Bagaimana
                kalau kamu coba tanya kabar 3 temanmu dan ajak mereka untuk berbagi juga di sini?
                <br />
                <br />
                <hr />
                <br />
                Kami akan terus mengupdate info terbaru dari project ini melalui kanal kami di
                Instagram{' '}
                <a target="__blank" href="https://www.instagram.com/coollab.id/">
                  @coollab.id
                </a>
                .
                <br />
                <br />
                Kami sangat terbuka dengan kolaborasi dalam project ini. Kamu pun dapat mengolah
                input data yang masuk dengan menggunakan API{' '}
                <a target="__blank" href="https://github.com/alif-faishol/2020itu">
                  di sini.
                </a>
                <br />
                <br />
                Jika ada pertanyaan lebih lanjut seputar proyek ini, silakan kontak kami melalui
                email
                <a target="__blank" href="mailto:lets@coollab.id">
                  {' '}
                  lets@coollab.id
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <h1 className="text-title-3">About #2020was</h1>
              <p className="text-body-3">
                We want to invite you to share your feeling throughout 2020 as a word or emoji. This
                was one of #weekendproject from{' '}
                <a target="__blank" href="https://coollab.id/">
                  Coollab.id
                </a>
                , initiated by{' '}
                <a target="__blank" href="https://www.instagram.com/erdry/">
                  @erdry
                </a>{' '}
                and{' '}
                <a target="__blank" href="https://www.linkedin.com/in/alif-faishol-b79231a5">
                  Alif
                </a>
                .
                <br />
                <br />
                {
                  "We all know this year isn't easy to go through alone. So how about asks 3 of your friends to share their feelings here?"
                }
                <br />
                <br />
                <hr />
                <br />
                {'We will keep you updated with this project via our Instagram at '}
                <a target="__blank" href="https://www.instagram.com/coollab.id/">
                  @coollab.id
                </a>
                .
                <br />
                <br />
                {
                  "We are very open to collaboration through this project, therefor you can use the data we've gathered using our API "
                }
                <a target="__blank" href="https://github.com/alif-faishol/2020itu">
                  here
                </a>
                .
                <br />
                <br />
                {
                  "If there's any question regarding this page, feel free to contact us via email at"
                }
                <a target="__blank" href="mailto:lets@coollab.id">
                  {' '}
                  lets@coollab.id
                </a>
                .
              </p>
            </>
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
