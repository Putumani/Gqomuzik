import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const songsDirectory = path.join(process.cwd(), './audios');
  const songs = fs.readdirSync(songsDirectory);

  res.status(200).json(songs);
}


