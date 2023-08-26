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
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleAudioConversion() {
    if (!file || file.type !== 'audio/mpeg') {
      setError('Please select an .mp3 file.');
      return;
    }
  
    const data = new FormData();
    setSubmitting(true);
  
    data.append('file', file);
  
    try {
      const response = await axios.post('/api/uploads', data);
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


  
  async function handleSubmit() {
    if (!file || file.type !== 'audio/mpeg') {
      setError('Please select an .mp3 file.');
      return;
    }

    const data = new FormData();

    setSubmitting(true);

    data.append('file', file);

    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.total !== undefined) {
          const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          setProgress(percentComplete);
        }
      },
    };

    try {
      const response = await axios.post('/api/uploads', data);
      const uploadedAudio: Audio = response.data;
      handleAudioUpload(uploadedAudio);
  
      // Call the new function for MP3 to MP4 conversion
      await handleAudioConversion();
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
      setError(null);
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-120 p-8 bg-gray-800 rounded-lg"> 
        <h2 className="text-xl font-bold text-white mb-4">Upload Music</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {submitting && <p className="text-white mb-4">{progress}%</p>}
        <form action="POST">
          <div className="mb-6"> 
            <label htmlFor="artist" className="text-white block">
              Artist
            </label>
            <input type="text" id="artist" placeholder="Artist Name" className="py-2 w-full bg-gray-700 rounded-md" />
          </div>
          <div className="mb-6"> 
            <label htmlFor="songName" className="text-white block">
              Song Name
            </label>
            <input type="text" id="songName" placeholder="Song Name" className="py-2 w-full bg-gray-700 rounded-md" />
          </div>
          <div className="mb-6"> 
            <label htmlFor="file" className="text-white block">
              File
            </label>
            <input type="file" id="file" onChange={handleSetFile} className="py-2 w-full bg-gray-700 rounded-md" accept=".mp3" />
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
              disabled={!file || submitting}
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

