import React, { FC } from 'react';

type FooterType = {
  theme?: 'light' | 'dark';
};

const Footer: FC<FooterType> = ({ theme = 'dark' }) => {
  return (
    <footer className={`footer ${theme}`}>
      &copy; Copyright{' '}
      <a target="__blank" href="https://coollab.id/">
        Coollab.id
      </a>
      . Proudly #madeinbdg.
    </footer>
  );
};

export default Footer;
