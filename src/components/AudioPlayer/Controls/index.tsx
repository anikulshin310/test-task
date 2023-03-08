import React, { FC } from 'react';
import { ReactComponent as Play } from '../../../assets/img/play.svg';
import { ReactComponent as Pause } from '../../../assets/img/pause.svg';
import styles from './index.module.scss';

type TControls = {
  isPaused: boolean;
  onClick: () => void;
};

export const Controls: FC<TControls> = ({ isPaused, onClick }) => (
  <div className={styles.buttons}>
    {isPaused ? (
      <button type="button" onClick={onClick}>
        <Play />
      </button>
    ) : (
      <button type="button" onClick={onClick}>
        <Pause />
      </button>
    )}
  </div>
);
