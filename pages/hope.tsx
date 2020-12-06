import { NextPage } from 'next';
import styles from '@styles/Home.module.css';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const HopePage: NextPage = () => {
  const router = useRouter();
  const [hope, setHope] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    axios.post('/api/hopes', { hope });
    setSent(true);
  }, [hope]);

  return (
    <>
      <div
        className={[styles.container, 'share-container-normal'].join(' ')}
        style={{ background: 'white' }}
      >
        {sent ? (
          <>
            <span className="text-subtitle" style={{ color: 'black', fontSize: 32 }}>
              Terimakasih atas tanggapannya!
            </span>
            <button
              onClick={() => router.back()}
              className="button"
              style={{ background: 'black', color: 'white', marginTop: 48 }}
            >
              Kembali
            </button>
          </>
        ) : (
          <>
            <span className="text-subtitle" style={{ color: 'black' }}>
              harapan kamu untuk
            </span>
            <h1 className="text-title" style={{ color: 'black' }}>
              2021?
              <br />
            </h1>
            <textarea
              className="react-autosuggest__input"
              style={{ fontSize: 18, textAlign: 'left', color: 'black' }}
              placeholder="Ketik disini"
              value={hope}
              onChange={(e) => setHope(e.target.value)}
            ></textarea>
            <button
              onClick={onSubmit}
              className="button"
              style={{ background: 'black', color: 'white', marginTop: 32 }}
            >
              Kirim
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default HopePage;
