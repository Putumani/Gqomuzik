import type { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import fs from 'fs';
import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { promisify } from 'util';

const fsStat = promisify(fs.stat);

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
  console.log('Uploading audio:', audioId);

  const bb = busboy({ headers: req.headers });

  bb.on('file', (_, file, info) => {
    const fileName = info.filename;
    const filePath = `./audios/${fileName}`;

    console.log('File path:', filePath);

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on('close', async () => {
    console.log('Audio upload completed:', audioId);
    // After audio upload, call the function to convert to video
    try {
      await convertAudioToVideo(audioId);
      res.writeHead(200, { Connection: 'close' });
      res.end(`Uploaded and converted successfully!!!`);
    } catch (error) {
      res.status(500).send('Error converting audio to video.');
    }
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

async function convertAudioToVideo(audioId: string) {
  const audioPath = `./audios/${audioId}.mp3`;
  const videoPath = `./videos/${audioId}.mp4`;

  const audioExists = await fsStat(audioPath).catch(() => null);
  if (!audioExists) {
    throw new Error('Audio file not found.');
  }

  const cmd = `python3 - <<END\nimport os\nfrom moviepy.editor import *\naudio = AudioFileClip("${audioPath}")\nvideo = audio.to_videofile("${videoPath}", codec="libx264")\nEND`;

  await new Promise<void>((resolve, reject) => {
    const pythonProcess = spawn('sh', ['-c', cmd], {
      shell: true,
    } as SpawnOptionsWithoutStdio);

    pythonProcess.on('exit', (code: number) => {
      if (code === 0) {
        console.log('Audio conversion to video successful');
        resolve();
      } else {
        console.error('Error converting audio to video');
        reject(new Error('Audio to video conversion failed'));
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python Conversion Error:', data.toString());
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const audioId = req.query.audioId as string;
    return await uploadAudioStream(req, res, audioId);
  }

  if (req.method === 'GET') {
    const audioId = req.query.audioId as string;

    if (audioId) {
      return await getAudioStream(req, res);
    } else {
      return res.status(200).json({ audios });
    }
  } else {
    return res.status(405).send('Method Not Allowed');
  }
}





