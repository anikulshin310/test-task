import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime } from '../../helpers/formatTime';
import { setError } from '../../store/slices/audioSlice';
import { Controls } from './Controls';
import styles from './index.module.scss';
import { Progress } from './Progress';
import { Time } from './Time';
import { Volume } from './Volume';

type TAudioPlayer = {
  src: string;
};

export const AudioPlayer: FC<TAudioPlayer> = ({ src }) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLAudioElement | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [formatedTime, setFormatedTime] = useState<string>('00:00');

  const handlePlay = () => {
    if (isPaused && ref.current) {
      ref.current.play();
      setDuration(ref.current.duration);
      setIsPaused(false);
    }
    if (!isPaused && ref.current) {
      ref.current.pause();
      setIsPaused(true);
    }
  };
  const handleTime: React.ReactEventHandler<HTMLAudioElement> = () => {
    if (ref.current) {
      const minutes = Math.floor(ref.current.currentTime / 60);
      const seconds = Math.floor(ref.current.currentTime - minutes * 60);
      setFormatedTime(`${formatTime(`${minutes}`, '0', 2)}:${formatTime(`${seconds}`, '0', 2)}`);
      setCurrentTime(ref.current.currentTime);
      setDuration(ref.current.duration);
    }
  };
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.currentTime = +e.target.value;
    }
  }, []);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.volume = +e.target.value / 10;
      setVolume(+e.target.value);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      setIsPaused(ref.current.paused);
    }
  }, [isPaused]);
  useEffect(() => {
    ref.current?.addEventListener('ended', () => setIsPaused(true));
    return () => {
      ref.current?.removeEventListener('ended', () => setIsPaused(true));
    };
  });
  useEffect(() => {
    if (ref.current) {
      setError(ref.current.networkState === 3);
      /* console.log('error'); */
    }
  }, [src]);
  return (
    <div className={styles.player_wrapper}>
      <Link to="/">← Back</Link>

      <audio ref={ref} src={src} onTimeUpdate={handleTime}>
        <track kind="captions" />
      </audio>

      <div className={styles.player}>
        <Controls isPaused={isPaused} onClick={handlePlay} />
        <Progress currentTime={currentTime} duration={duration} onChange={handleChange} />
        <div className={styles.bottom}>
          <Time time={formatedTime} />
          <Volume onChange={handleVolume} volume={volume} />
        </div>
      </div>
    </div>
  );
};
