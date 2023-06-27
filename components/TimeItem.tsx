import React, { FC } from "react";
import { parseTime } from '@/lib/helpers';

interface TimeItemProps {
  time: string;
}

const TimeItem: FC<TimeItemProps> = ({ time }) => {
  const decimalSeconds = parseFloat(time);
  const hms: string = parseTime(decimalSeconds).join(':');
  return <span>{hms}</span>;
};

export default TimeItem;

