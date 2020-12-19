import { NextPage } from 'next';
import axios from 'axios';
import styles from '@styles/Home.module.css';
import i18n from '@utils/i18n';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import {
  FacebookFilled,
  OrderedListOutlined,
  ShareAltOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import WordRain from '@components/WordRain';
import Footer from '@components/Footer';
import { TFunction } from 'next-i18next';

type ResultPageProps = {
  word?: string;
  t?: TFunction;
  namespacesRequired: string[];
};

const ResultPage: NextPage<ResultPageProps> = ({ word, t }) => {
  const router = i18n.Router;

  const shareableRef = useRef<HTMLDivElement>();
  const maxWordCountRef = useRef<number>(1);
  const [words, setWords] = useState<Array<{ word: string; count: number }>>([]);
  const [mode, setMode] = useState<'normal' | 'square' | 'story'>('normal');
  const [modal, setModal] = useState<'share' | 'graph'>();

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
    axios.get('/api/words').then((res) => {
      setWords(
        res.data?.Items?.map((item: { [key: string]: { [key: string]: string } }) => {
          if (maxWordCountRef.current < parseInt(item.SubmitCount?.N, 10)) {
            maxWordCountRef.current = parseInt(item.SubmitCount?.N, 10);
          }

          return {
            word: item.Message?.S,
            count: parseInt(item.SubmitCount?.N, 10),
          };
        })
          .filter((item: { word: string | undefined; count: number }) => item.word && item.count)
          .sort((a, b) => {
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;
            return 0;
          })
      );
    });
  }, []);

  return (
    <>
      <div ref={shareableRef} className={`share-container share-container-${mode}`}>
        <div className="background">
          <WordRain words={words} maxCount={maxWordCountRef.current} />
        </div>
        <div className="hide-when-normal share-frame">
          <div className="frame-text">2020itu.com</div>
        </div>
        <div className={styles.container} style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
          <h1 className="text-title">
            #{t('2020itu')}
            <br />
            <span className="text-subtitle">{word}</span>
          </h1>
          <div>
            <button
              onClick={() => setModal('share')}
              className="button hide-when-share"
              style={{ padding: 8, width: 48, height: 48 }}
            >
              <ShareAltOutlined />
            </button>
            <button
              onClick={() => setModal('graph')}
              className="button hide-when-share"
              style={{ marginLeft: 8, padding: 8, width: 48, height: 48 }}
            >
              <OrderedListOutlined />
            </button>
          </div>
          <i18n.Link href="/hope">
            <a className="button hide-when-share" style={{ marginTop: 24 }}>
              {t('Selanjutnya')}
            </a>
          </i18n.Link>
        </div>
      </div>
      <Footer />
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
        {modal === 'graph' && (
          <div className="modal-content" style={{ paddingTop: 0 }}>
            <h1 className="text-subtitle" style={{ color: 'black', fontSize: 24 }}>
              {t('Respon Populer')}
            </h1>
            <div
              style={{
                overflow: 'auto',
                maxHeight: 250,
                padding: 8,
                border: '1px solid black',
              }}
            >
              {words.map((word) => (
                <div key={word.word} className="word-stat-container">
                  <div>{word.word}</div>
                  <div>{word.count}</div>
                </div>
              ))}
            </div>
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
