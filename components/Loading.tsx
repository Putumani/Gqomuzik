import React, { FC } from "react";
import { ClockLoader } from 'react-spinners';
import { FaMusic } from 'react-icons/fa';

interface LoadingProps {
  loaded: boolean;
  title: string;
}

const Loading: FC<LoadingProps> = ({ loaded, title }) => (
  <div className="flex gap-2 [&>*]:my-auto">
    {loaded ? <FaMusic size={20} color="magenta" /> : <ClockLoader size={20} color="black" />}
    <div>{loaded ? title : 'Loading...'}</div>
  </div>
);

export default Loading;
