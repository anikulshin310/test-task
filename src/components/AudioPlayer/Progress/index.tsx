import React, { FC } from 'react';
import styles from './index.module.scss';

type TProgress = {
  currentTime: number;
  duration: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Progress: FC<TProgress> = ({ currentTime, duration, onChange }) => (
  <div className={styles.progress_bar}>
    <input
      type="range"
      min={0}
      max={duration}
      value={currentTime}
      onChange={onChange}
      className={styles.slider}
      style={{
        background: `linear-gradient(to right, #fff 0%, #fff ${
          (currentTime / duration) * 100
        }%, #ADACAD ${currentTime / duration}%, #ADACAD 100%)`,
      }}
    />
  </div>
);
