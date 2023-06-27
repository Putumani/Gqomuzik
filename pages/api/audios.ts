import type { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import fs from 'fs';

interface Audio {
  id: string;
  url: string;
}

const audios: Audio[] = [];

export const config = {
  api: {
    bodyParser: false,
  },
};

function uploadAudioStream(req: NextApiRequest, res: NextApiResponse) {
  const bb = busboy({ headers: req.headers });

  bb.on('file', (_, file, info) => {
    const fileName = info.filename;
    const filePath = `./audios/${fileName}`;

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on('close', () => {
    res.writeHead(200, { Connection: 'close' });
    res.end(`Uploaded successfully!!!`);
  });

  req.pipe(bb);
}

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 MB

function getAudioStream(req: NextApiRequest, res: NextApiResponse) {
  const range = req.headers.range;

  if (!range) {
    return res.status(400).send('Range must be provided');
  }

  const audioId = req.query.audioId as string;

  const audioPath = `./audios/${audioId}.mp3`;

  const audioSizeInBytes = fs.statSync(audioPath).size;

  const chunkStart = Number(range.replace(/\D/g, ''));

  const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, audioSizeInBytes - 1);

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${audioSizeInBytes}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'audio/mp3',
  };

  res.writeHead(206, headers);

  const audioStream = fs.createReadStream(audioPath, { start: chunkStart, end: chunkEnd });

  audioStream.pipe(res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return uploadAudioStream(req, res);
  } 
  
  if (req.method === 'GET') {
    const audioId = req.query.audioId as string;

    if (audioId) {
      return getAudioStream(req, res);
    } else {
      return res.status(200).json({ audios });
    }
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}



