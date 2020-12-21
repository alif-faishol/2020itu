import { NextPage } from 'next';
import axios from 'axios';
import i18n from '@utils/i18n';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import { FacebookFilled, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import WordRain from '@components/WordRain';
import Footer from '@components/Footer';
import { TFunction } from 'next-i18next';
import Header from '@components/Header';

type ResultPageProps = {
  word?: string;
  t?: TFunction;
  namespacesRequired: string[];
};

const ResultPage: NextPage<ResultPageProps> = ({ word, t }) => {
  const router = i18n.Router;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  const shareableRef = useRef<HTMLDivElement>();
  const [words, setWords] = useState<Array<{ word: string; count: number }>>([]);
  const [mode, setMode] = useState<'normal' | 'square' | 'story'>('normal');
  const [modal, setModal] = useState<'share'>();

  const canShare = typeof window !== 'undefined' && navigator.share;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const canShareImage = canShare && navigator.canShare;

  const onShare = useCallback((type: 'square' | 'story') => {
    if (!shareableRef.current) return;
    setMode(type);
  }, []);

  const onUrlShare = useCallback(() => {
    navigator.share({ url: window.location.href, text: `#${t('2020itu')} ${word}` });
  }, [t, word]);

  useEffect(() => {
    if (mode === 'normal') return;
    toBlob(shareableRef.current, {
      pixelRatio: 1,
      width: mode === 'story' ? 500 : 500,
      height: mode === 'story' ? 888 : 500,
    }).then((blob) => {
      navigator.share({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        files: [new File([blob], 'share.png', { type: blob.type })],
        title: t('2020itu'),
      });
      setMode('normal');
    });
  }, [mode, t]);

  useEffect(() => {
    if (router && !word) {
      router.replace('/');
    }
  }, [router, word]);

  useEffect(() => {
    axios.get('/api/words', { params: { size: Math.round(windowWidth / 30) } }).then((res) => {
      setWords(res.data.data);
    });
  }, [windowWidth]);

  return (
    <>
      <div ref={shareableRef} className={`share-container share-container-${mode}`}>
        <div className="background">
          <WordRain words={words} />
        </div>
        <Header />
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            flex: 1,
            width: '100%',
            display: 'flex',
          }}
        >
          <div className="content">
            <h1 className="text-title">
              #{t('2020itu')}
              <br />
              <span className="text-word">{word}</span>
            </h1>
            <div>
              <button
                onClick={() => setModal('share')}
                className="button link hide-when-share"
                style={{ whiteSpace: 'nowrap' }}
              >
                {t('button_label_share')}
              </button>
              <i18n.Link href="/hope">
                <a className="button hide-when-share" style={{ marginTop: 24 }}>
                  {t('button_label_next')}
                </a>
              </i18n.Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="modal-container">
        {/* eslint-disable-next-line */}
        <div
          className="modal-overlay"
          style={{ visibility: modal ? 'visible' : 'hidden', opacity: modal ? 1 : 0 }}
          onClick={() => setModal(undefined)}
        ></div>
        {modal === 'share' && (
          <div className="modal-content">
            <button
              onClick={() => onShare('square')}
              className="share-option"
              disabled={!canShareImage}
              style={{ marginBottom: 8 }}
            >
              <div className="share-option-title">{t('square_share')}</div>
              <div className="share-option-subtitle">{t('square_share_description')}</div>
            </button>
            <button
              onClick={() => onShare('story')}
              className="share-option"
              disabled={!canShareImage}
              style={{ marginBottom: 8 }}
            >
              <div className="share-option-title">{t('story_share')}</div>
              <div className="share-option-subtitle">{t('story_share_description')}</div>
            </button>
            {!canShareImage && (
              <div
                className="text-subtitle"
                style={{ fontSize: 12, color: 'red', marginBottom: 8, textAlign: 'left' }}
              >
                {t('image_share_not_supported')}
              </div>
            )}
            {canShare ? (
              <button className="share-option" onClick={onUrlShare}>
                <div className="share-option-title">{t('url_share')}</div>
                <div className="share-option-subtitle">{t('url_share_description')}</div>
              </button>
            ) : (
              <div className="share-option">
                <div className="share-option-title">{t('url_share')}</div>
                <div className="share-option-subtitle">{t('url_share_description')}</div>
                <div style={{ marginTop: 8 }}>
                  <a
                    target="__blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    className="button hide-when-share"
                    style={{ padding: 8, width: 48, height: 48 }}
                  >
                    <FacebookFilled />
                  </a>
                  <a
                    target="__blank"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(`#${t('2020itu')} ${word}`)}`}
                    className="button hide-when-share"
                    style={{ marginLeft: 8, padding: 8, width: 48, height: 48 }}
                  >
                    <TwitterOutlined />
                  </a>
                  <a
                    target="__blank"
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `#${t('2020itu')} ${word} ${window.location.href}`
                    )}`}
                    className="button hide-when-share"
                    style={{ marginLeft: 8, padding: 8, width: 48, height: 48 }}
                  >
                    <WhatsAppOutlined />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

ResultPage.getInitialProps = (ctx) => {
  return {
    word: !Array.isArray(ctx.query.word) ? ctx.query.word : undefined,
    namespacesRequired: ['common'],
  };
};

export default i18n.withTranslation('common')(ResultPage);
