import React, { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as Arrow } from '../../assets/img/button-arrow.svg';
import { ReactComponent as Warning } from '../../assets/img/warning.svg';
import style from './index.module.scss';

type TLinkInput = {
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
};

export const LinkInput: FC<TLinkInput> = ({ onSubmit, onChange, isError }) => {
  const cx = cn.bind(style);
  return (
    <div className={style.search_input_wrapper}>
      <span>Insert the link</span>
      <div className={style.search_input}>
        <input
          placeholder="https://"
          onChange={onChange}
          className={cx({ error_input: isError })}
        />
        {isError && <Warning className={style.warning} />}
        <button type="button" onClick={onSubmit}>
          <Arrow />
        </button>
        {isError && <span className={style.error}>Please, enter a valid URL</span>}
      </div>
    </div>
  );
};
