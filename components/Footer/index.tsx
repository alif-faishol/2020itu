import React, { FC } from 'react';

type FooterType = {
  theme?: 'light' | 'dark';
};

const Footer: FC<FooterType> = ({ theme = 'dark' }) => {
  return (
    <footer className={`footer ${theme}`}>
      &copy; Copyright 2020 Coollab.id. Proudly #madeinbdg.
    </footer>
  );
};

export default Footer;
