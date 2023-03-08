import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AudioPlayer } from './components/AudioPlayer';
import { LinkInput } from './components/LinkInput';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkUrl, searchError, searchUrl, setUrl } from './store/slices/audioSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isError = useAppSelector(searchError);
  const url = useAppSelector(searchUrl);
  const [value, setValue] = useState<string>('');
  const submitHandler = () => {
    dispatch(checkUrl(value));
    dispatch(setUrl(value));
    if (!isError) {
      navigate('/player');
    }
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LinkInput onSubmit={submitHandler} onChange={changeHandler} isError={isError} />
          }
        />
        <Route path="/player" element={url && <AudioPlayer src={url} />} />
      </Routes>
      {/*   {}
      {url ? (
        <AudioPlayer src={url} />
      ) : (
        <LinkInput onSubmit={submitHandler} onChange={changeHandler} isError={isError} />
      )} */}
    </>
  );
};

export default App;
