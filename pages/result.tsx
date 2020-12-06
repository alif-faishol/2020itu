import { NextPage } from 'next';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@styles/Home.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import { OrderedListOutlined, ShareAltOutlined } from '@ant-design/icons';
import WordRain from '@components/WordRain';

type ResultPageProps = {
  word?: string;
};

const ResultPage: NextPage<ResultPageProps> = ({ word }) => {
  const router = useRouter();

  const shareableRef = useRef<HTMLDivElement>();
  const maxWordCountRef = useRef<number>(1);
  const [words, setWords] = useState<Array<{ word: string; count: number }>>([]);
  const [mode, setMode] = useState<'normal' | 'square' | 'story'>('normal');
  const [modal, setModal] = useState<'share' | 'graph'>();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const canShareImage = typeof window !== 'undefined' && navigator.canShare;

  const onShare = useCallback((type: 'square' | 'story') => {
    if (!shareableRef.current) return;
    setMode(type);
  }, []);

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
        title: '2020itu',
      });
      setMode('normal');
    });
  }, [mode]);

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
            #2020itu
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
          <Link href="hope">
            <a className="button hide-when-share" style={{ marginTop: 24 }}>
              Selanjutnya
            </a>
          </Link>
        </div>
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
              <div className="share-option-title">Persegi (Gambar)</div>
              <div className="share-option-subtitle">Gambar untuk posting</div>
            </button>
            <button
              onClick={() => onShare('story')}
              className="share-option"
              disabled={!canShareImage}
              style={{ marginBottom: 8 }}
            >
              <div className="share-option-title">Story (Gambar)</div>
              <div className="share-option-subtitle">Gambar untuk story</div>
            </button>
            {!canShareImage && (
              <div
                className="text-subtitle"
                style={{ fontSize: 12, color: 'red', marginBottom: 8, textAlign: 'left' }}
              >
                Browser tidak mendukung berbagi gambar
              </div>
            )}
            <button className="share-option">
              <div className="share-option-title">URL</div>
              <div className="share-option-subtitle">Link ke halaman ini</div>
            </button>
          </div>
        )}
        {modal === 'graph' && (
          <div className="modal-content" style={{ paddingTop: 0 }}>
            <h1 className="text-subtitle" style={{ color: 'black', fontSize: 24 }}>
              Kata Populer
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
  return { word: !Array.isArray(ctx.query.word) ? ctx.query.word : undefined };
};

export default ResultPage;
