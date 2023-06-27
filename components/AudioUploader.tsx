import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface Audio {
  id: string;
  url: string;
  artist: string;
  songName: string;
}

interface AudioUploaderProps {
  closeUploader: () => void;
  handleAudioUpload: (audio: Audio) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ closeUploader, handleAudioUpload }) => {
  const [file, setFile] = useState<File | undefined>();
  const [artist, setArtist] = useState<string>('');
  const [songName, setSongName] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit() {
    const data = new FormData();

    if (!file) return;

    setSubmitting(true);

    data.append('file', file);
    data.append('artist', artist);
    data.append('songName', songName);

    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.total !== undefined) {
          const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          setProgress(percentComplete);
        }
      },
    };

    try {
      const response = await axios.post('/api/audios', data, config);
      const uploadedAudio: Audio = response.data;
      handleAudioUpload(uploadedAudio);
      closeUploader();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
      setProgress(0);
    }
  }

  function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files?.length) {
      setFile(files[0]);
    }
  }

  function handleArtistChange(event: React.ChangeEvent<HTMLInputElement>) {
    setArtist(event.target.value);
  }

  function handleSongNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSongName(event.target.value);
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-96 p-8 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Upload Music</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {submitting && <p className="text-white mb-4">{progress}%</p>}
        <form action="POST">
          <div className="mb-4">
            <label htmlFor="artist" className="text-white">
              Artist
            </label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={handleArtistChange}
              className="px-2 py-1 bg-gray-200 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="songName" className="text-white">
              Song Name
            </label>
            <input
              type="text"
              id="songName"
              value={songName}
              onChange={handleSongNameChange}
              className="px-2 py-1 bg-gray-200 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="text-white">
              File
            </label>
            <input type="file" id="file" onChange={handleSetFile} className="py-2" />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeUploader}
              className="px-4 py-2 bg-gray-600 rounded-md text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!file || !artist || !songName || submitting}
              className="px-4 py-2 bg-blue-500 rounded-md text-white disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AudioUploader;
