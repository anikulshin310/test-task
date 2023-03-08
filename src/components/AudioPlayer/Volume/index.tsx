import React, { FC } from 'react';
import styles from './index.module.scss';

type TVolume = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
};

export const Volume: FC<TVolume> = ({ onChange, volume }) => (
  <div className={styles.slider_wrapper}>
    <input
      className={styles.slider}
      type="range"
      onChange={onChange}
      min={0}
      max={1}
      step={0.1}
      style={{
        background: `linear-gradient(to right, #000 0%, #000 ${
          volume * 100
        }%, #fff ${volume}%, white 100%)`,
      }}
    />
  </div>
);
