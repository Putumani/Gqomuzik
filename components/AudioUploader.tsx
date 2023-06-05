import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface AudioUploaderProps {
  closeUploader: () => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ closeUploader }) => {
  const [file, setFile] = useState<File | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit() {
    const data = new FormData();

    if (!file) return;

    setSubmitting(true);

    data.append('file', file);

    const config: AxiosRequestConfig = {
      onUploadProgress: function (progressEvent) {
        if (progressEvent.total !== undefined) {
          const percentComplete = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setProgress(percentComplete);
        }
      },
    };

    try {
      await axios.post('/api/audios', data, config);
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

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-96 p-8 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Upload Music</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {submitting && <p className="text-white mb-4">{progress}%</p>}
        <form action="POST">
          <div className="mb-4">
            <label htmlFor="file" className="text-white">
              FILE
            </label>
            <input
              type="file"
              id="file"
              accept=".mp3"
              onChange={handleSetFile}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-orange-400"
              onClick={handleSubmit}
            >
              Upload
            </button>
            <button
              className="px-4 py-2 ml-2 text-white hover:text-gray-300"
              onClick={closeUploader}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AudioUploader;


