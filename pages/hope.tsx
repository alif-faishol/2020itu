import { NextPage } from 'next';
import { useState, useCallback } from 'react';
import axios from 'axios';
import i18n from '@utils/i18n';
import { I18n, TFunction } from 'next-i18next';
import Header from '@components/Header';
import Footer from '@components/Footer';

type HopePageProps = {
  t?: TFunction;
  i18n?: I18n;
  namespacesRequired: string[];
};

const HopePage: NextPage<HopePageProps> = ({ t, i18n: i18nInstance }) => {
  const [hope, setHope] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!hope) return;
      axios.post('/api/hopes', { hope });
      setSent(true);
    },
    [hope]
  );

  return (
    <>
      <div className="share-container share-container-normal" style={{ background: 'white' }}>
        <Header theme="light" />
        <form className="content" onSubmit={onSubmit}>
          {sent ? (
            <>
              <h1 className="text-title-2" style={{ fontSize: 22 }}>
                {t('thanks_for_response')}
              </h1>
              {i18nInstance.language === 'id' ? (
                <p className="text-body-2">
                  Kami akan melakukan video livestream untuk setiap input yang baru masuk.
                  <br />
                  Nantikan update informasi terbarunya di kanal
                  <a target="__blank" href="https://www.instagram.com/coollab.id/">
                    {' '}
                    Instagram @coollab.id
                  </a>{' '}
                  ya!
                </p>
              ) : (
                <p className="text-body-2">
                  We will host a livestream, visualizing every new incoming words.
                  <br />
                  Visit
                  <a target="__blank" href="https://www.instagram.com/coollab.id/">
                    {' '}
                    @coollab.id on Instagram
                  </a>{' '}
                  to keep updated!
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="text-title-2">{t('your_hope_for')}</h1>
              <input
                type="text"
                className="text-input light"
                placeholder={t('input_word_placeholder')}
                value={hope}
                onChange={(e) => setHope(e.target.value)}
              />
              <button type="submit" className="button" style={{ marginTop: 32 }}>
                {t('button_label_submit')}
              </button>
            </>
          )}
        </form>
        <Footer theme="light" />
      </div>
    </>
  );
};

HopePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default i18n.withTranslation('common')(HopePage);
