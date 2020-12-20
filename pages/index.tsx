import { NextPage } from 'next';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { TFunction } from 'next-i18next';
import i18n from '@utils/i18n';
import Footer from '@components/Footer';
import Header from '@components/Header';

type IndexPageProps = {
  t?: TFunction;
  namespacesRequired: string[];
};

const IndexPage: NextPage<IndexPageProps> = ({ t }) => {
  const router = i18n.Router;
  const [word, setWord] = useState<string>('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!word) return;
      axios.post('/api/words', { word });
      router.push({ pathname: '/result', query: { word } });
    },
    [word, router]
  );

  return (
    <div className={'share-container share-container-normal'} style={{ background: 'black' }}>
      <Header />
      <form className="content" onSubmit={onSubmit}>
        <h1 className="text-title">#{t('2020itu')}</h1>
        <input
          className="text-input"
          type="text"
          placeholder={t('input_word_placeholder')}
          value={word}
          onChange={(e) => setWord(e.target.value.slice(0, 15))}
        />
        <button type="submit" className="button" style={{ marginTop: 32 }}>
          {t('button_label_submit')}
        </button>
      </form>
      <Footer />
    </div>
  );
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default i18n.withTranslation('common')(IndexPage);
