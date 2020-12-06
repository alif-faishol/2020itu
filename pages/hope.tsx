import { NextPage } from 'next';
import styles from '@styles/Home.module.css';
import { useState, useCallback } from 'react';
import axios from 'axios';

const HopePage: NextPage = () => {
  const [hope, setHope] = useState<string>('');
  const [modal, setModal] = useState<'thanks'>();

  const onSubmit = useCallback(() => {
    axios.post('/api/hopes', { hope });
    setModal('thanks');
  }, [hope]);
  return (
    <>
      <div
        className={[styles.container, 'share-container-normal'].join(' ')}
        style={{ background: 'white' }}
      >
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
      </div>
      <div className="modal-container">
        {/* eslint-disable-next-line */}
        <div
          className="modal-overlay"
          style={{ visibility: modal ? 'visible' : 'hidden', opacity: modal ? 1 : 0 }}
          onClick={() => setModal(undefined)}
        ></div>
        {modal === 'thanks' && (
          <div className="modal-content" style={{ paddingTop: 0, backgroundColor: 'black' }}>
            <h1 className="text-subtitle" style={{ fontSize: 24, lineHeight: 1.2 }}>
              Terimakasih atas tanggapannya!
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default HopePage;
