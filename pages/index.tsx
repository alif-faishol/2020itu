import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '@styles/Home.module.css';
import { useState, useCallback, useEffect } from 'react';
import AutoSuggest from 'react-autosuggest';
import axios from 'axios';
import Fuse from 'fuse.js';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const [word, setWord] = useState<string>('');

  const [words, setWords] = useState<Array<{ word: string; count: number }>>([]);
  const [suggestedWords, setSuggestedWords] = useState<
    Array<{ item: { word: string; count: number } }>
  >([]);

  const fetchSuggestion = useCallback(
    async ({ value }) => {
      const fuse = new Fuse(words, {
        keys: ['word'],
      });
      setSuggestedWords(fuse.search(value));
    },
    [words]
  );

  const onSubmit = useCallback(() => {
    axios.post('/api/words', { word });
    router.push({ pathname: 'result', query: { word } });
  }, [word, router]);

  useEffect(() => {
    axios.get('/api/words').then((res) => {
      setWords(
        res.data?.Items?.map((item: { [key: string]: { [key: string]: string } }) => ({
          word: item.Message?.S,
          count: parseInt(item.SubmitCount?.N, 10),
        })).filter((item: { word: string | undefined; count: number }) => item.word && item.count)
      );
    });
  }, []);

  return (
    <>
      <div
        className={[styles.container, 'share-container-normal'].join(' ')}
        style={{ height: '100vh', background: 'black' }}
      >
        <h1 className="text-title">
          2020
          <br />
          <span className="text-subtitle">itu</span>
        </h1>
        <AutoSuggest
          renderSuggestion={(s) => <span>{s.item.word}</span>}
          onSuggestionsFetchRequested={fetchSuggestion}
          onSuggestionsClearRequested={() => {
            setSuggestedWords([]);
          }}
          suggestions={suggestedWords}
          getSuggestionValue={(item) => item.item.word}
          inputProps={{
            placeholder: 'Ketik disini',
            value: word,
            onChange: (_e, { newValue }) => setWord(newValue.slice(0, 15)),
          }}
        />
        <button onClick={onSubmit} className="button" style={{ marginTop: 32 }}>
          Kirim
        </button>
      </div>
    </>
  );
};

export default IndexPage;
