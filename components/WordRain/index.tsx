import { FC, Fragment, memo } from 'react';

type WordRainProps = {
  words: Array<{ word: string }>;
};

const WordRain: FC<WordRainProps> = ({ words }) => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  return (
    <Fragment>
      {Array.from({ length: Math.round(windowWidth / 30) }).map((_v, i) => {
        const item = words[i % words.length];
        if (!item) return;
        return (
          <div
            key={undefined}
            className="rain-text"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: 20 + 20 * Math.random(),
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${-2 + Math.random() * 5}s`,
            }}
          >
            {item.word}
          </div>
        );
      })}
    </Fragment>
  );
};

export default memo(WordRain);
