import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { audioId } = req.body;

    if (!audioId) {
      return res.status(400).json({ error: 'Invalid audioId provided' });
    }

    const mp3Path = `./audios/${audioId}.mp3`;
    const videoPath = `./videos/${audioId}.mp4`;

    const pythonProcess = spawn('python', [
      './mp3_to_mp4_converter.py',
      '--mp3_path',
      mp3Path,
      '--video_path',
      videoPath,
    ]);

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Conversion failed' });
      }
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}



