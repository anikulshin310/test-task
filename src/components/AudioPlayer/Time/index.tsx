import React, { FC } from 'react';

type TTime = {
  time: string;
};

export const Time: FC<TTime> = ({ time }) => <span>{time}</span>;
