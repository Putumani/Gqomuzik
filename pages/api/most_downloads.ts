import { NextApiRequest, NextApiResponse } from 'next';
import audios from './audios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(audios);
}



