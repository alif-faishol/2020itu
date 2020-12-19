import { NextPage } from 'next';
import styles from '@styles/Home.module.css';
import { useState, useCallback } from 'react';
import axios from 'axios';
import i18n from '@utils/i18n';
import { TFunction } from 'next-i18next';

type HopePageProps = {
  t?: TFunction;
  namespacesRequired: string[];
};

const HopePage: NextPage<HopePageProps> = ({ t }) => {
  const router = i18n.Router;
  const [hope, setHope] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    axios.post('/api/hopes', { hope });
    setSent(true);
  }, [hope]);

  return (
    <>
      <div
        className={[styles.container, 'share-container-normal'].join(' ')}
        style={{ background: 'white' }}
      >
        {sent ? (
          <>
            <span className="text-subtitle" style={{ color: 'black', fontSize: 32 }}>
              {t('thanks_for_response')}
            </span>
            <button
              onClick={() => router.back()}
              className="button"
              style={{ background: 'black', color: 'white', marginTop: 48 }}
            >
              {t('Kembali')}
            </button>
          </>
        ) : (
          <>
            <span className="text-subtitle" style={{ color: 'black' }}>
              {t('your_hope_for')}
            </span>
            <h1 className="text-title" style={{ color: 'black' }}>
              2021?
              <br />
            </h1>
            <textarea
              className="react-autosuggest__input"
              style={{ fontSize: 18, textAlign: 'left', color: 'black' }}
              placeholder={t('Ketik di sini')}
              value={hope}
              onChange={(e) => setHope(e.target.value)}
            ></textarea>
            <button
              onClick={onSubmit}
              className="button"
              style={{ background: 'black', color: 'white', marginTop: 32 }}
            >
              {t('Kirim')}
            </button>
          </>
        )}
      </div>
    </>
  );
};

HopePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default i18n.withTranslation('common')(HopePage);
