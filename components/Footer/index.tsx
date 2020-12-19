import React, { FC } from 'react';
import i18n from '@utils/i18n';
import { TFunction, I18n } from 'next-i18next';

type FooterType = {
  i18n: I18n;
  t?: TFunction;
};

const Footer: FC<FooterType> = ({ i18n: i18nInstance, t }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        {i18nInstance.language === 'id' ? (
          <button onClick={() => i18nInstance.changeLanguage('en')} className="language-button">
            EN
          </button>
        ) : (
          <button onClick={() => i18nInstance.changeLanguage('id')} className="language-button">
            ID
          </button>
        )}
      </div>
      <i18n.Link href="/about">{t('about')}</i18n.Link>
    </div>
  );
};

export default i18n.withTranslation('common')(Footer);
