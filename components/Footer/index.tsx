import React, { FC } from 'react';

type FooterType = {
  theme?: 'light' | 'dark';
};

const Footer: FC<FooterType> = ({ theme = 'dark' }) => {
  return (
    <footer className={`footer ${theme}`}>
      <a
        href="https://www.producthunt.com/posts/2020itu?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-2020itu"
        target="_blank"
        rel="noreferrer"
        style={{ lineHeight: 1 }}
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=279063&theme=light"
          alt="#2020itu - Share your thoughts on 2020 in a word or emoji � | Product Hunt"
          className="producthunt-badge"
        />
      </a>
      <div>
        &copy; Copyright{' '}
        <a target="__blank" href="https://coollab.id/">
          Coollab.id
        </a>
        .&nbsp; Proudly #madeinbdg.
      </div>
    </footer>
  );
};

export default Footer;
