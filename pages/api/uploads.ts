import type { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'ffmpeg-static';
import { spawn, SpawnOptionsWithoutStdio } from 'child_process';

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

function uploadAudioStream(req: NextApiRequest, res: NextApiResponse, audioId: string) {
  const bb = busboy({ headers: req.headers });

  bb.on('file', (_, file, info) => {
    const fileName = info.filename;
    const filePath = `./audios/${fileName}`;

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on('close', () => {
    // After audio upload, call the function to convert to video
    convertAudioToVideo(audioId);

    res.writeHead(200, { Connection: 'close' });
    res.end(`Uploaded successfully!!!`);
  });

  req.pipe(bb);
}

const CHUNK_SIZE_IN_BYTES = 1000000; // 1 MB

function getAudioStream(req: NextApiRequest, res: NextApiResponse) {
  // Rest of the code remains unchanged
}

function convertAudioToVideo(audioId: string) {
  const audioPath = `./audios/${audioId}.mp3`;
  const videoPath = `./videos/${audioId}.mp4`;

  // Call the ffmpeg command to convert audio to video
  const ffmpegCommand = `${ffmpeg} -i ${audioPath} -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" ${videoPath}`;

  const conversionProcess = spawn(ffmpegCommand, [], {
    shell: true,
  } as SpawnOptionsWithoutStdio);

  conversionProcess.on('exit', (code: number) => {
    if (code === 0) {
      console.log('Audio conversion to video successful');
    } else {
      console.error('Error converting audio to video');
    }
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const audioId = req.query.audioId as string; // Get the audioId from the query parameter
    return uploadAudioStream(req, res, audioId); // Pass the audioId as a parameter to uploadAudioStream
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





