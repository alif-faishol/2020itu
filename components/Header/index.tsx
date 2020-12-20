import React, { FC } from 'react';
import { TFunction, I18n } from 'next-i18next';
import i18n from '@utils/i18n';

type HeaderProps = {
  i18n: I18n;
  t: TFunction;
  theme?: 'dark' | 'light';
  isInAboutPage?: boolean;
};

const Header: FC<HeaderProps> = ({
  i18n: i18nInstance,
  t,
  theme = 'dark',
  isInAboutPage = false,
}) => {
  return (
    <div className="header-container">
      <div className="header-left-container">
        <i18n.Link href="/">
          <a>
            <img src={`/images/logo_${theme}.png`} alt="2020itu.com" />
          </a>
        </i18n.Link>
      </div>
      <div className="header-right-container">
        <i18n.Link href={isInAboutPage ? '/' : '/about'}>
          <a className="button link small" style={{ color: theme === 'light' ? 'black' : 'white' }}>
            {isInAboutPage ? t('button_label_home') : t('button_label_about')}
          </a>
        </i18n.Link>
        <div className="header-lang-switcher">
          {i18nInstance.language === 'id' ? (
            <img src="/images/flag_id.svg" alt="ID" style={{ border: '1px solid black' }} />
          ) : (
            <img src="/images/flag_us.svg" alt="EN" />
          )}
          <div className="header-lang-switcher-options">
            <button
              className="header-lang-switcher-option"
              onClick={() => i18nInstance.changeLanguage('id')}
            >
              <img src="/images/flag_id.svg" alt="ID" style={{ border: '1px solid black' }} />
              Bahasa Indonesia
            </button>
            <button
              className="header-lang-switcher-option"
              onClick={() => i18nInstance.changeLanguage('en')}
            >
              <img src="/images/flag_us.svg" alt="EN" />
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default i18n.withTranslation('common')(Header);
